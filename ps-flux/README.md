# Building Applications with React and Flux

Environment Setup

1. npx create-react-app ps-flux
2. install flux, react router and bootstrap
   - be sure the dependencies version we use are the same
   - npm install flux@3.1.3 react-router-dom@5.0.0 bootstrap@4.3.1
3. setting up an mock API(local mock api)
   使用 JSON server 设置模拟 API，提供请求和更改课程和作者数据的端点

   - npm install -D cross-env@5.2.0 npm-run-all@4.1.5 json-server@0.15.0
     meaning:
   - -D:为了 mock api 会安装更多的软件包，由于这些包都是开发工具，添加-D 标志，以便将他写入 package.json 是列在 dev 依赖项下。
   - cross-env 是一个用于社会环境变量的方便库
   - npm-run-all 将允许我们同时运行多个脚本
   - json-server 将提供我们的模拟数据

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

   - 将 tools 文件放入根目录下，和 src 文件夹同级
   - apiserver:will serve the api that we use in this course.this file uses express with json server to host a mock api and simulated database using a json file.json server provides a command line interface,but i am using the more advanced module config to add custom server-side validation down at the bottom of file
   - createmockdb:this script will recreate our mock data each time we start the app and write it to a sperate file called db.json.this file will be read and manipulated by our api server.
   - mockdb.js:contains the mock data.this data will populate our mock database.this data contains arrays of our courses,and also an array of authors,as well as the data structure for creating a new course.to put these scripts to use.具体如何运作已经在注释中写明，也可以在 json server docs 中进行深入了解

   it automatiacally supports changing data too,we can use get post put ...and it will write to db.json behind the secenes

   - db.json:our fake database,aviods us accidentally deleting all the data and having to start over,remember each time you start the application this db.json file will be regenerated.it will protect us in case we write a bug and accidently corrupt the data or delete it all.each time we start the app, mockdata.js is copied into db.json

5. create some scripts in package.json
   we want to recreate the mock database each time we start the app,by convention,this will run before start:api because it has the same name,but prefixed with "pre" - add "prestart:api": "node tools/createMockDb.js",
   this script will use node to call tools/apiServer.js - add "start:api": "node tools/apiServer.js",
6. change start scripts in package.json
   - "start": "react-scripts start",change into
   - "start":"run-p start:dev start:api",
   - "start:dev": "react-scripts start",

set it up to start the mock api each time that we start the app,rename the start script to start:dev.and create a new start script,

- run-p:(npm run all package,run parallel)it would allow us tp run both our app and our api at the same time.
- db.json 会在 port 3001 运行，app 会在 3000 运行(同时)

7.  add api files under the src directory

    - these files will make it easy to make calls to our mock api.
    - courseapi:contains the functions that will get courses save courses and delete courses
    - authorapi:...like above
    - apiutils:centrailzes the handling of our api reponses.using fetch to make api calls.fetch is built into modern browers so we can make http calls without installing an extra library.fetch has promise-based api,with the then function is called when the async call is complete

8.  add cross-dev into start:dev script

    - "start:dev": "cross-env REACT_APP_API_URL=http://localhost:3001 react-scripts start",
    - notice how referencing an environment variable for the base url,this is a package from npm that let us to set environment variables in a cross-platform friendly way.
    - the environment variables we want to set is REACT_APP_API_URL,and we set it to the url for our mock api which is local host 3001.
    - create-react-app looks for env vars that statr with react_app and allows us to replace their valiues in code
    - `const baseUrl = process.env.REACT_APP_API_URL + "/courses/";`
    - so our reference to process.env.react_app_api_url will be replace by create-react-app with the value of the environment variable that we just declared.

前端基础：html/css/js/typescript
前端框架：react/vue
前端工具:webpack/sass/less
版本管理/单元测试:git/jest
后端:node.js/graphql
