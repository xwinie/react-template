
export default [
    {
        path: '/home',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./home/index.jsx'))
            })
        }
    },

    // demo
    {
        path: '/demo/table-demo',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./demo/table-demo/TableDemo.jsx'))
            })
        }
    },
    {
        path: '/demo/todo',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./demo/todolist/TodoList'))
            })
        }
    },
    {
        path: '/demo/upload-demo',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./demo/upload-demo/UploadDemo.jsx'))
            })
        }
    },


    //404
    {
        path: '/404',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./not-found/index.jsx'))
            })
        }
    }
]

