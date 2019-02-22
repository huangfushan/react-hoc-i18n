/**
 * 国际化语言高阶组件
 * @Author: huangfushan
 * @Date: 2019-02-22
 * @Project: react-i18n
 */

import React from 'react';
import { en, cn } from './i18n/index';
import PropTypes from 'prop-types';

const thesaurus = { cn, en };

function I18nProvider() {
  class Provider extends React.Component {
    // getChildContext: 将store传递给子孙component
    //language: 当前语言
    //thesaurus: 当前语言所对应的词库
    getChildContext() {
      return { language: this.props.language, thesaurus: thesaurus[this.props.language] || thesaurus.cn };
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
    thesaurus: PropTypes.object,
  };
  Provider.displayName = 'I18nProvider';
  return Provider;
}

export default I18nProvider();
