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
          if ($this.hasClass('active')) {
            return false
          }
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
          formData.append('file', this.files[0])
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
      },

      questionsOperation: function () {
        var $delete = $('#questions-delete')

        $delete.on('click', function (e) {
          var checks = $('.questions-checkbox[type="checkbox"]:checked')
          console.log(checks)
        })
      }
    }

    _index.init()
    _staff.init()
    _ajax.init()
    _questions.init()
  })
}()