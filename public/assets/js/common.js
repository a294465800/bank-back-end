! function () {
  $(function () {
    /**
     * 公用函数
     */
    var _common = {

      //格式化表单数据
      JSONData(data) {
        var tmp = {}
        for (var i = 0; i < data.length; i++) {
          tmp[data[i].name] = data[i].value
        }
        return tmp
      }
    }

    /**
     * ajax
     */
    var _ajax = {

      init: function () {
        // $.ajaxSetup({
        //   headers: {
        //     'Origin': this.host
        //   }
        // })
      },

      host: 'http://192.168.3.44:8081/api/v1/',

      errFnc: function (err) {
        console.log(err)
      },

      /**
       * 更换验证码
       * @param {Object} data
       * @param {Function} cb 回调
       */
      smsGet: function (cb) {
        $.ajax({
          type: 'GET',
          url: this.host + 'sms',
          success: function (res) {
            typeof cb === 'function' && cb(res)
          },
          error: function (err) {
            _ajax.errFnc(err)
          }
        })
      },

      /**
       * 新增职工表单提交
       * @param {Object} data
       * @param {Function} cb 回调
       */
      staffAdd: function (data, cb) {
        $.ajax({
          type: 'POST',
          url: this.host + 'staff/add',
          data: data,
          success: function (res) {
            typeof cb === 'function' && cb(res)
          },
          error: function (err) {
            _ajax.errFnc(err)
          }
        })
      },

      /**
       * 上传
       * @param {Object} data {file}
       * @param {Function} cb 回调
       */
      upload: function (data, cb) {
        $.ajax({
          type: 'POST',
          url: this.host + 'upload',
          data: data,
          contentType: false,
          processData: false,
          success: function (res) {
            typeof cb === 'function' && cb(res)
          },
          error: function (err) {
            _ajax.errFnc(err)
          }
        })
      },

      /**
       * 题库表单提交
       * @param {Object} data
       * @param {Function} 回调
       */
      questionsAdd: function (data, cb) {
        $.ajax({
          type: 'POST',
          url: this.host + 'questions/add',
          data: data,
          success: function (res) {
            typeof cb === 'function' && cb(res)
          },
          error: function (err) {
            _ajax.errFnc(err)
          }
        })
      },

      /**
       * 题目编辑
       * @param {Object} data
       * @param {Function} cb 回调
       */
      questionEdit: function (data, cb) {
        $.ajax({
          type: 'POST',
          url: this.host + 'questions/edit',
          data: data,
          success: function (res) {
            typeof cb === 'function' && cb(res)
          },
          error: function (err) {
            _ajax.errFnc(err)
          }
        })
      },

      /**
       * 考试添加表单提交
       */
      examinationAdd: function (data, cb) {
        $.ajax({
          type: 'POST',
          url: this.host + 'examination/add',
          data: data,
          success: function (res) {
            typeof cb === 'function' && cb(res)
          },
          error: function (err) {
            _ajax.errFnc(err)
          }
        })
      }
    }


    /**
     * index 页面 jq
     */
    var _index = {
      init: function () {
        this.closeAlert()
        this.navbarActive()
      },

      //关闭过时提醒
      closeAlert: function () {
        var $alertClose = $('#alert-close')
        $alertClose.on('click', function (e) {
          $(this).parent('.alert').fadeOut()
        })
      },

      //导航点击、展开
      navbarActive: function () {
        var $navbar = $('.navbar-list')
        $navbar.on('click', '.navbar-item', function (e) {
          var $this = $(this)
          if ($this.hasClass('active')) {
            return false
          }
          var $navItem = $('.navbar-item')
          $navItem.removeClass('active')
          $this.addClass('active')
        })

        $navbar.on('click', '.navbar-sub-item', function (e) {
          var $this = $(this)
          var $navSubItem = $('.navbar-sub-item')
          $navSubItem.removeClass('active')
          $this.addClass('active')
          var route = $this.data('route')
          _index.iframeChange(route)
        })
      },

      //更改 iframe 地址
      iframeChange(route) {
        var $iframe = $('#iframe')
        $iframe.attr('src', route)
      }
    }

    /**
     * 职员 页面 jq
     */
    var _staff = {
      init: function () {
        this.staffSubmit()
        this.staffOperation()
      },

      //职员添加保存
      staffSubmit: function () {
        var $submit = $('#staff-submit')
        $submit.on('submit', function (e) {
          var $this = $(this)
          var data = _common.JSONData($this.serializeArray())
          _ajax.staffAdd(data, function (res) {
            window.location.href = 'staffList.html'
          })
          e.preventDefault()
        })
      },

      //职员列表操作
      staffOperation: function () {
        var $edit = $('#staff-edit')
        var $delete = $('#staff-delete')
        var $upload = $('#staff-upload')

        $edit.on('click', function (e) {
          var $checks = $('.staff-checkbox[type="checkbox"]:checked')
          console.log($checks)
          window.location.href = 'staffAdd.html'
        })

        $delete.on('click', function (e) {
          var $checks = $('.staff-checkbox[type="checkbox"]:checked')
          console.log($checks.data('id'))
        })

        $upload.on('change', function (e) {
          var formData = new FormData()
          var files = this.files
          if (files.length < 1) {
            return false
          }
          formData.append('file', files[0])
          _ajax.upload(formData, function (res) {
            console.log(res)
          })
        })
      }
    }

    /**
     * 题库 页面 jq
     */
    var _questions = {
      init: function () {
        this.questionsOperation()
        this.questionsSubmit()
        this.questionOperation()
        this.questionSubmit()
      },

      //题库操作
      questionsOperation: function () {
        var $delete = $('#questions-delete')

        $delete.on('click', function (e) {
          var checks = $('.questions-checkbox[type="checkbox"]:checked')
          console.log(checks)
        })
      },

      //题库添加保存
      questionsSubmit: function () {
        var $submit = $('#questions-submit')
        var $upload = $('#questions-upload')

        $upload.on('change', function (e) {
          var formData = new FormData()
          var files = this.files
          if (files.length < 1) {
            return false
          }
          formData.append('file', files[0])
          _ajax.upload(formData, function (res) {
            console.log(res)
          })
        })

        $submit.on('submit', function (e) {
          const $this = $(this)
          var data = _common.JSONData($this.serializeArray())
          _ajax.questionsAdd(data, function (res) {
            window.location.href = 'questions.html'
          })
          e.preventDefault()
        })
      },

      questionOperation: function () {
        var $edit = $('#question-edit')
        var $delete = $('#question-delete')

        $edit.on('click', function () {
          var checks = $('.question-checkbox[type="checkbox"]:checked')
          console.log(checks)
          window.location.href = 'questionEdit.html?id=' + checks.data('id')
        })

        $delete.on('click', function () {
          var checks = $('.question-checkbox[type="checkbox"]:checked')
          console.log(checks)
        })
      },

      questionSubmit: function () {
        var $submit = $('#question-submit')
        $submit.on('submit', function (e) {
          const $this = $(this)
          var $checkbox = $('input[type="checkbox"]:checked')
          if ($checkbox.length === 0) {
            window.alert('请至少选一个答案！')
            return false
          }
          var data = _common.JSONData($this.serializeArray())
          _ajax.questionEdit(data, function (res) {
            window.location.href = 'questions.html'
          })
          e.preventDefault()
        })
      }
    }

    /**
     * 考试管理 页面 jq
     */
    var _examination = {
      init: function () {
        this.examinationOperation()
        this.examinationSubmit()
        this.examinationSearch()
      },

      //考试设置操作
      examinationOperation: function () {
        var $edit = $('#examination-edit')
        var $delete = $('#examination-delete')

        $edit.on('click', function () {
          var checks = $('.examination-checkbox[type="checkbox"]:checked')
          console.log(checks)
          window.location.href = 'examinationAdd.html?id=' + checks.data('id')
        })

        $delete.on('click', function () {
          var checks = $('.examination-checkbox[type="checkbox"]:checked')
          console.log(checks)
        })
      },

      //考试添加表单
      examinationSubmit: function () {
        var $submit = $('#examination-submit')
        $submit.on('submit', function (e) {
          const $this = $(this)
          var data = _common.JSONData($this.serializeArray())
          _ajax.examinationAdd(data, function (res) {
            window.location.href = 'examinationConfig.html'
          })
          e.preventDefault()
        })
      },

      //考试结果查询
      examinationSearch: function () {
        var $search = $('#examination-search')

        $search.on('submit', function (e) {
          const $this = $(this)
          var data = _common.JSONData($this.serializeArray())
          console.log(data)
          e.preventDefault()
        })
      }
    }

    /**
     * 登录 页面 jq
     */
    var _login = {
      init: function () {
        this.getSms()
      },

      getSms: function () {
        var $sms = $('#sms-img')
        $sms.on('click', function (e) {
          var $this = $(this)
          _ajax.smsGet(res => {
            $this.attr('src', res.url)
          })
        })
      }
    }

    _index.init()
    _staff.init()
    _ajax.init()
    _questions.init()
    _examination.init()
    _login.init()
  })
}()