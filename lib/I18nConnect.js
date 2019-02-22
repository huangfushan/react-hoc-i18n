/**
 * 国际化语言高阶组件
 * @Author: huangfushan
 * @Date: 2019-02-22
 * @Project: react-i18n
 */

import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash.merge';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const I18nConnect = (key, i18nObj) => WrappedComponent => {
  const connectDisplayName = `Connect(${getDisplayName(WrappedComponent)})`;

  class Connect extends React.Component {

    /**
     * 获取当前语言
     * @params language：当前语言
     * @params thesaurus：当前语言对于的词库
     */
    //如果i18nObj存在，说明添加自定义语言
    //如果key存在，说明只拿到thesaurus词库中对于key字段的词库
    getLanguage(language, thesaurus) {
      let i18n = thesaurus;
      if (i18nObj) {
        i18n = merge({}, thesaurus, i18nObj[language]);
      }
      if (key) {
        i18n = { [key]: i18n[key] || {} };
      }
      return i18n;
    }

    render() {
      const thesaurus = this.getLanguage(this.context.language, this.context.thesaurus);
      return React.createElement(WrappedComponent, {
        ...this.props,
        i18n: { ...thesaurus, language: this.context.language }
      });
    }
  }

  // Connect组件上赋了displayName和（展示名称，也就是组件类型）和WrappedComponent（被包装组件类）
  Connect.displayName = connectDisplayName;
  Connect.WrappedComponent = WrappedComponent;
  Connect.contextTypes = {
    language: PropTypes.string,
    thesaurus: PropTypes.object,
  };
  Connect.propTypes = {
    language: PropTypes.string,
    thesaurus: PropTypes.object,
  };
  return Connect;
};

export default I18nConnect;
