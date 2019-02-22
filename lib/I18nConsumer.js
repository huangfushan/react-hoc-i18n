/**
 * 国际化语言高阶组件
 * @Author: huangfushan
 * @Date: 2019-02-22
 * @Project: react-i18n
 */

import React from 'react';
import { en, cn } from './index';
import PropTypes from 'prop-types';

const I18nConsumer = (key, custom) => Comp => {
  class Consumer extends React.Component {
    constructor(props, context) {
      super(props, context);
      // Provider提供的store
      this.languages = props.languages || context;
    }

    render() {
      let i18n;
      if (this.context.languages.hasOwnProperty(key)) {
        i18n = { [key]: this.context.languages[key] };
      } else {
        i18n = { ...this.context.languages, language: this.context.language };
      }
      if (custom) {
        i18n = Object.assign({}, { ...i18n }, custom[this.context.language]);
      }
      return React.createElement(Comp, { ...this.props, ...i18n });
    }
  }

  Consumer.Comp = Comp;
  Consumer.displayName = 'I18nConsumer';
  Consumer.contextTypes = {
    language: PropTypes.string,
    languages: PropTypes.object,
  };
  Consumer.propTypes = {
    language: PropTypes.string,
    languages: PropTypes.object,
  };
  return Consumer;
};

export default I18nConsumer;
