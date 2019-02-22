# 介绍
* 多语言插件,默认版本中文，支持自定义拓展
* 当前项目上传在github上，未再npm站点维护

# 引入
* 在 package.json 文件的 dependencies 中添加如下代码：
  ```
  "react-i18n": "git+https://github.com/huangfushan/react-i18n.git#semver:*.*.*"
  ```
  * `semver:*.*.*`指版本号，如`semver:0.1.0`
* 然后执行 npm i

# 使用
* 在根目录App.js文件中
  ```
  import React from 'react';
  import './App.css';
  import Comp from './Comp';
  import { I18nProvider } from 'react-i18n';

  class App extends React.Component {
    render() {
      return (
        <div className="App">
          <I18nProvider language='en'>
            <Comp/>
          </I18nProvider>
        </div>
      );
    }
  }

  export default App;

  ```
* 在子组件Comp.js文件中
  ```
  import React from 'react';
  import { I18nConect } from 'react-i18n';

  class Comp extends React.Component {
    render() {
      const { i18n } = this.props;
      return (
        <div className="App">
          <div>
            <p>{i18n.COMMON.USERNAME}</p>
          </div>
        </div>
      );
    }
  }

  export default I18nConect()(Comp);
  ```

# 拓展
  * react-i8n提供两个方法，I18nProvider,I18nConnect
    * `I18nProvider`提供者，是一个react组件，包裹在跟组件外层，i18n数据会通过context形式传递给其 `I18nProvider`的子组件。
      目前提供中英两语言版本，`中文cn`和`英文en`，在引用时需要指明环境语言版本language，默认`中文cn`。
      ```
      <I18nProvider language='en'>
         <App/>
      </I18nProvider>
      ```
    * `I18nConnect` 连接器，是一个函数，连接react组件与I18nProvider的数据传递，允许将i18n数据作为props绑定到子组件上。
      这个函数接收两个参数
      第一参数是 i18n 的指定数据，如果为null，则props会拿到当前语言的所有数据。如果传递 "COMMON" 则只会获取当前语言的COMMON字段。
       ```
        class Comp extends Component {
          render() {
            return (
              <div>{this.props.i18n.COMMON.USERNAME}</div>
            )
          }
        }

        export default I18nConect("COMMON")(Comp);
      ```
      第二参数是 i18n 的自定义数据，支持自定义引入组件自身的数据。
      ```
        const i18n = {
          cn: {
            USER: {
              NAME: "名字",
              GENDER: "性别",
            },
            ADDRESS: {
              "PROVINCE": "福建省",
              "CITY": "莆田市",
              "COUNTY": "仙游县",
            }
          },
          en: {
            USER: {
              NAME: "name",
              GENDER: "gender",
            },
            ADDRESS: {
              "PROVINCE": "Fujian",
              "CITY": "Putian",
              "COUNTY": "Xianyou",
            }
          }
        }

        class Comp extends Component {
          render() {
            return (
              <div>{this.props.i18n.USER.NAME}</div>
              <div>{this.props.i18n.ADDRESS.CITY}</div>
              <div>{this.props.i18n.COMMON.USERNAME}</div>
            )
          }
        }

        export default I18nConect(null, i18n)(Comp);
      ```
