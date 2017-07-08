/* @flow */
import React from 'react';

import type { Auth, Actions, Message, DomElement, StyleObj } from '../types';
import HtmlNode from './HtmlNode';

type Props = {
  auth?: Auth,
  actions: Actions,
  message?: Message,
  childrenNodes?: DomElement[],
  cascadingStyle?: StyleObj,
  cascadingTextStyle?: StyleObj,
  onPress?: (html: string) => void,
  actions?: Actions,
  indexedStyles?: any[],
};

export default ({
  auth,
  actions,
  cascadingStyle,
  childrenNodes,
  cascadingTextStyle,
  onPress,
  pushRoute,
  message,
  indexedStyles
}: Props) =>
  childrenNodes &&
  childrenNodes
    .filter(
      x =>
        x.data !== '\n' &&
        !(x.attribs && x.attribs['aria-hidden'] === 'true') &&
        x.name !== 'annotation'
    )
    .map((node, index) =>
      (<HtmlNode
        key={index}
        auth={auth}
        actions={actions}
        cascadingStyle={cascadingStyle}
        cascadingTextStyle={[cascadingTextStyle, indexedStyles && indexedStyles[index]]}
        data={node.data}
        name={node.name}
        type={node.type}
        attribs={node.attribs}
        childrenNodes={node.children}
        onPress={onPress}
        message={message}
      />)
    );
