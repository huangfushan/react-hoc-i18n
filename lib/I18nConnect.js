/**
 * 国际化语言高阶组件
 * @Author: huangfushan
 * @Date: 2019-02-22
 * @Project: react-i18n
 */

import React from 'react';
import { en, cn } from './i18n/index';
import PropTypes from 'prop-types';
import merge from 'lodash.merge';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const I18nConnect = (key, i18nObj) => WrappedComponent => {
  const connectDisplayName = `Connect(${getDisplayName(WrappedComponent)})`;

  class Connect extends React.Component {

    getLanguage(language, languages) {
      let i18n = languages;
      if (i18nObj) {
        i18n = merge({}, languages, i18nObj[language]);
      }
      if (key) {
        i18n = { [key]: i18n[key] || {} };
      }
      return i18n;
    }

    render() {
      const languages = this.getLanguage(this.context.language, this.context.languages);
      return React.createElement(WrappedComponent, {
        ...this.props,
        i18n: { ...languages, language: this.context.language }
      });
    }
  }

  // Connect组件上赋了displayName和（展示名称，也就是组件类型）和WrappedComponent（被包装组件类）
  Connect.displayName = connectDisplayName;
  Connect.WrappedComponent = WrappedComponent;
  Connect.contextTypes = {
    language: PropTypes.string,
    languages: PropTypes.object,
  };
  Connect.propTypes = {
    language: PropTypes.string,
    languages: PropTypes.object,
  };
  return Connect;
};

export default I18nConnect;
