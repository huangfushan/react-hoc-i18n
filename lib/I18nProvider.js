/**
 * 国际化语言高阶组件
 * @Author: huangfushan
 * @Date: 2019-02-22
 * @Project: react-i18n
 */

import React from 'react';
import { en, cn } from './i18n/index';
import PropTypes from 'prop-types';

const languages = { cn, en };

//
// /**
//  * 这个方法提供两个参数
//  * @param key：如果key不存在，则获取全部，key存在则拿到对应的obj
//  * @param custom：组件自身的多语言，更多是一次性的会定义在组件里面
//  * @return {function(*): {new(): {render(): *}, prototype: {render(): *}}}
//  * @constructor
//  */

function I18nProvider() {
  class Provider extends React.Component {
    // getChildContext: 将store传递给子孙component
    getChildContext() {
      return { language: this.props.language, languages: languages[this.props.language] || languages.cn };
    }

    // 拿到传入的language直接挂在到当前language上
    constructor(props, context) {
      super(props, context);
      this.language = props.language;
    }

    render() {
      return React.Children.only(this.props.children);
    }
  }

  Provider.propTypes = {
    language: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
  };
  Provider.childContextTypes = {
    language: PropTypes.string,
    languages: PropTypes.object,
  };
  Provider.displayName = 'I18nProvider';
  return Provider;
}

export default I18nProvider();
