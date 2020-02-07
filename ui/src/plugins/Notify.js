import Vue from 'vue'

import QAvatar from '../components/avatar/QAvatar.js'
import QIcon from '../components/icon/QIcon.js'
import QBtn from '../components/btn/QBtn.js'
import QBadge from '../components/badge/QBadge.js'

import clone from '../utils/clone.js'
import { noop } from '../utils/event.js'
import { isSSR } from './Platform.js'

let uid = 0
let defaults = {}

const positionList = [
  'top-left', 'top-right',
  'bottom-left', 'bottom-right',
  'top', 'bottom', 'left', 'right', 'center'
]

const groups = {}

const Notifications = {
  name: 'QNotifications',

  data: {
    notifs: {
      center: [],
      left: [],
      right: [],
      top: [],
      'top-left': [],
      'top-right': [],
      bottom: [],
      'bottom-left': [],
      'bottom-right': []
    }
  },

  methods: {
    add (config) {
      if (!config) {
        console.error('Notify: parameter required')
        return false
      }

      let notif = { textColor: 'white' }

      if (typeof config === 'string' || config.ignoreDefaults !== true) {
        Object.assign(notif, defaults)
      }

      Object.assign(
        notif,
        typeof config === 'string'
          ? { message: config }
          : clone(config)
      )

      if (notif.position) {
        if (!positionList.includes(notif.position)) {
          console.error(`Notify: wrong position: ${notif.position}`)
          return false
        }
      }
      else {
        notif.position = 'bottom'
      }

      if (notif.group === void 0) {
        notif.group = `${notif.message}|${notif.caption}`
      }
      notif.group += '|' + notif.position

      if (notif.timeout === void 0) {
        notif.timeout = 5000
      }
      else {
        const t = parseInt(notif.timeout, 10)
        if (isNaN(t) || t < 0) {
          console.error(`Notify: wrong timeout: ${notif.timeout}`)
          return false
        }
        notif.timeout = t
      }

      if (notif.badge === void 0) {
        notif.badge = {}
      }

      const actions = (config.actions || [])
        .concat(config.ignoreDefaults !== true && Array.isArray(defaults.actions) === true ? defaults.actions : [])

      notif.actions = actions.length > 0
        ? actions.map(item => {
          const
            handler = item.handler,
            action = clone(item)

          action.handler = typeof handler === 'function'
            ? () => {
              handler()
              !item.noDismiss && notif.__close()
            }
            : () => { notif.__close() }

          return action
        })
        : void 0

      if (typeof config.onDismiss === 'function') {
        notif.onDismiss = config.onDismiss
      }

      if (typeof notif.closeBtn === 'string') {
        const btn = { label: notif.closeBtn, handler: () => { notif.__close() } }
        notif.actions = notif.actions
          ? notif.actions.concat(btn)
          : [ btn ]
      }

      if (notif.multiLine === void 0 && notif.actions) {
        notif.multiLine = notif.actions.length > 1
      }

      notif.staticClass = [
        `q-notification row items-stretch col-auto`,
        notif.color && `bg-${notif.color}`,
        notif.textColor && `text-${notif.textColor}`,
        `q-notification--${notif.multiLine === true ? 'multi-line' : 'standard'}`,
        notif.classes
      ].filter(n => n).join(' ')

      const groupNotif = groups[notif.group]

      // wohoo, new notification
      if (groupNotif === void 0) {
        notif.__uid = uid++
        notif.__badge = 1

        if (['left', 'right', 'center'].indexOf(notif.position) > -1) {
          this.notifs[notif.position].splice(Math.floor(this.notifs[notif.position].length / 2), 0, notif)
        }
        else {
          const action = notif.position.indexOf('top') > -1 ? 'unshift' : 'push'
          this.notifs[notif.position][action](notif)
        }

        groups[notif.group] = notif
      }
      // ok, so it's NOT a new one
      else {
        // do NOT override position
        notif.position = groupNotif.position

        // reset timeout if any
        if (groupNotif.__timeout !== void 0) {
          clearTimeout(groupNotif.__timeout)
        }

        notif = Object.assign(groups[notif.group], notif)
        groups[notif.group].__badge++
      }

      notif.__close = () => {
        this.remove(notif)
      }

      if (notif.timeout > 0) {
        notif.__timeout = setTimeout(() => {
          notif.__close()
        }, notif.timeout + /* show duration */ 1000)
      }

      return notif.__close
    },

    remove (notif) {
      if (notif.__timeout) { clearTimeout(notif.__timeout) }

      const index = this.notifs[notif.position].indexOf(notif)
      if (index !== -1) {
        groups[notif.group] = void 0

        const el = this.$refs[`notif_${notif.__uid}`]

        if (el) {
          const { width, height } = getComputedStyle(el)

          el.style.left = `${el.offsetLeft}px`
          el.style.width = width
          el.style.height = height
        }

        this.notifs[notif.position].splice(index, 1)

        if (typeof notif.onDismiss === 'function') {
          notif.onDismiss()
        }
      }
    }
  },

  render (h) {
    return h('div', { staticClass: 'q-notifications' }, positionList.map(pos => {
      const
        vert = ['left', 'center', 'right'].includes(pos) ? 'center' : (pos.indexOf('top') > -1 ? 'top' : 'bottom'),
        align = pos.indexOf('left') > -1 ? 'start' : (pos.indexOf('right') > -1 ? 'end' : 'center'),
        classes = ['left', 'right'].includes(pos) ? `items-${pos === 'left' ? 'start' : 'end'} justify-center` : (pos === 'center' ? 'flex-center' : `items-${align}`)

      return h('transition-group', {
        key: pos,
        staticClass: `q-notifications__list q-notifications__list--${vert} fixed column no-wrap ${classes}`,
        tag: 'div',
        props: {
          name: `q-notification--${pos}`,
          mode: 'out-in'
        }
      }, this.notifs[pos].map(notif => {
        let msgChild
        const msgData = { staticClass: 'q-notification__message col' }

        if (notif.html === true) {
          msgData.domProps = {
            innerHTML: notif.caption
              ? `<div>${notif.message}</div><div class="q-notification__caption">${notif.caption}</div>`
              : notif.message
          }
        }
        else {
          const msgNode = [ notif.message ]
          msgChild = notif.caption
            ? [
              h('div', msgNode),
              h('div', { staticClass: 'q-notification__caption' }, [ notif.caption ])
            ]
            : msgNode
        }

        const mainChild = []

        if (notif.icon) {
          mainChild.push(
            h(QIcon, {
              staticClass: 'q-notification__icon col-auto',
              props: { name: notif.icon }
            })
          )
        }
        else if (notif.avatar) {
          mainChild.push(
            h(QAvatar, { staticClass: 'q-notification__avatar col-auto' }, [
              h('img', { attrs: { src: notif.avatar } })
            ])
          )
        }

        mainChild.push(
          h('div', msgData, msgChild)
        )

        if (notif.__badge > 1) {
          mainChild.push(
            h(QBadge, {
              key: `${notif.__uid}|${notif.__badge}`,
              staticClass: 'q-notification__badge self-center',
              props: { color: notif.badge.color, textColor: notif.badge.textColor },
              style: notif.badge.style,
              class: notif.badge.class
            }, [ notif.__badge ])
          )
        }

        const child = [
          h('div', {
            staticClass: 'row items-center ' + (notif.multiLine === true ? '' : 'col')
          }, mainChild)
        ]

        notif.actions !== void 0 && child.push(
          h('div', {
            staticClass: 'q-notification__actions row items-center ' + (notif.multiLine === true ? 'justify-end' : 'col-auto')
          }, notif.actions.map(action => h(QBtn, {
            props: { flat: true, ...action },
            on: { click: action.handler }
          })))
        )

        return h('div', {
          ref: `notif_${notif.__uid}`,
          key: notif.__uid,
          staticClass: notif.staticClass
        }, [
          h('div', {
            staticClass: 'col relative-position ' + (notif.multiLine === true ? 'column no-wrap justify-center' : 'row items-center')
          }, child)
        ])
      }))
    }))
  }
}

export default {
  create (opts) {
    if (isSSR === true) { return noop }
    return this.__vm.add(opts)
  },
  setDefaults (opts) {
    opts === Object(opts) && Object.assign(defaults, opts)
  },

  install ({ cfg, $q }) {
    if (isSSR === true) {
      $q.notify = noop
      $q.notify.setDefaults = noop
      return
    }

    this.setDefaults(cfg.notify)

    $q.notify = this.create.bind(this)
    $q.notify.setDefaults = this.setDefaults

    const node = document.createElement('div')
    document.body.appendChild(node)

    this.__vm = new Vue(Notifications)
    this.__vm.$mount(node)
  }
}
