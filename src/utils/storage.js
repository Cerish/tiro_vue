const ls = localStorage
const ss = sessionStorage
const storage = {
  ls: {
    get (key) {
      try {
        return JSON.parse(ls.getItem(key))
      } catch (err) {
        return ls.getItem(key);
      }
    },
    set (key, value) {
      // 创建一个StorageEvent事件
      var newStorageEvent = document.createEvent('StorageEvent');
      ls.setItem(key, JSON.stringify(value));
      // 初始化创建的事件
      newStorageEvent.initStorageEvent('setItem', false, false, key, null, value, null, null);
      // 派发对象
      window.dispatchEvent(newStorageEvent);
    },
    remove (key) {
      ls.removeItem(key)
    },
    clear () {
      ls.clear()
    }
  },
  ss: {
    get (key) {
      try {
        return JSON.parse(ss.getItem(key))
      } catch (err) {
        return ss.getItem(key)
      }
    },
    set (key, value) {
      ss.setItem(key, JSON.stringify(value))
    },
    remove (key) {
      ss.removeItem(key)
    },
    clear () {
      ss.clear()
    }
  }
}
export default storage;