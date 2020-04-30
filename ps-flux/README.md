# Building Applications with React and Flux

Environment Setup
1. npx create-react-app ps-flux
2. install flux, react router and bootstrap
    - be sure the dependencies version we use are the same
    - npm install flux@3.1.3 react-router-dom@5.0.0 bootstrap@4.3.1
3. setting up an mock API(local mock api)
    使用JSON server 设置模拟API，提供请求和更改课程和作者数据的端点
    - npm install -D cross-env@5.2.0 npm-run-all@4.1.5 json-server@0.15.0
    meaning:
    - -D:为了mock api 会安装更多的软件包，由于这些包都是开发工具，添加-D标志，以便将他写入package.json是列在dev依赖项下。
    - cross-env是一个用于社会环境变量的方便库
    - npm-run-all将允许我们同时运行多个脚本
    - json-server将提供我们的模拟数据

    BE SURE TO USE THE SAME VERSION!
    warning during install are common,but it should still work fine.
    advantages:
    - function: host a mock API that simulates making async calls to server
    - start before the API exists
    - independence
    - backup plan
    - ultra-fast
    - test slowness
    - aids testing
    - point the real api later
4. copy some files from exercise files
    - 将tools文件放入根目录下，和src文件夹同级

前端基础：html/css/js/typescript
前端框架：react/vue
前端工具:webpack/sass/less
版本管理/单元测试:git/jest
后端:node.js/graphql
