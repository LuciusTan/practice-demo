const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const cors = require('@koa/cors')

const app = new Koa()
const router = new Router()

router.prefix('/api')

router.post('/user',async (ctx) => {
    let {body, header} = ctx.request
    //console.log(ctx.request)
    if(!header.role || header.role !== "admin"){
        ctx.body = {
            'code': 401,
            'msg': 'unauthorized post'
        }
    }else if(!body.name || !body.email) {
        ctx.body = {
            'code': 404,
            'msg': 'name与email不得为空'
        }
    }else {
        ctx.body = {
            'code': 200,
            'data': {
                'name': body.name,
                'email': body.email
            },
            'msg': '上传成功'
        }
    }
    
})
app.use(koaBody())
app.use(router.routes())
.use(router.allowedMethods())
app.listen(3000)