/* @flow strict-local */
import React, { useState, useRef, useCallback, useContext } from 'react';
import type { Node } from 'react';
import { Platform, TextInput, View, Keyboard } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import type { AppNavigationProp } from '../nav/AppNavigator';
import { ThemeContext, createStyleSheet, HALF_COLOR } from '../styles';

const styles = createStyleSheet({
  wrapper: {
    flexDirection: 'row',
    opacity: 0.8,
  },
  realmInput: {
    flex: 1,
    padding: 0,
    fontSize: 20,
  },
});

type Props = $ReadOnly<{|
  // TODO: Currently this type is acceptable because the only
  // `navigation` prop we pass to a `SmartUrlInput` instance is the
  // one from a component on AppNavigator.
  navigation: AppNavigationProp<>,

  style?: ViewStyleProp,
  onChangeText: (value: string) => void,
  onSubmitEditing: () => Promise<void>,
  enablesReturnKeyAutomatically: boolean,
|}>;

/**
 * Work around https://github.com/facebook/react-native/issues/19366.
 *
 * The bug: If the keyboard is dismissed only by pressing the built-in
 *   Android back button, then the next time you call `.focus()` on the
 *   input, the keyboard won't open again. On the other hand, if you call
 *   `.blur()`, then the keyboard *will* open the next time you call
 *   `.focus()`.
 *
 * This workaround: Call `.blur()` on the input whenever the keyboard is
 *   closed, because it might have been closed by the built-in Android back
 *   button. Then when we call `.focus()` the next time, it will open the
 *   keyboard, as expected. (We only maintain that keyboard-closed listener
 *   when this SmartUrlInput is on the screen that's focused in the
 *   navigation.)
 *
 * Other workarounds that didn't work:
 * - When it comes time to do a `.focus()`, do a sneaky `.blur()` first,
 *   then do the `.focus()` 100ms later. It's janky. This was #2078,
 *   probably inspired by
 *     https://github.com/facebook/react-native/issues/19366#issuecomment-400603928.
 * - Use RN's `BackHandler` to actually listen for the built-in Android back
 *   button being used. That didn't work; the event handler wasn't firing
 *   for either `backPress` or `hardwareBackPress` events. (We never
 *   committed a version of this workaround.)
 */
function useRn19366Workaround(textInputRef) {
  if (Platform.OS !== 'android') {
    return;
  }

  // (Disabling `react-hooks/rules-of-hooks` here is fine; the relevant rule
  // is not to call Hooks conditionally. But the platform conditional won't
  // vary in its behavior between multiple renders.)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useFocusEffect(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useCallback(() => {
      const handleKeyboardDidHide = () => {
        if (textInputRef.current) {
          // `.current` is not type-checked; see definition.
          textInputRef.current.blur();
        }
      };

      Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

      return () => Keyboard.removeListener('keyboardDidHide', handleKeyboardDidHide);
    }, [textInputRef]),
  );
}

export default function SmartUrlInput(props: Props): Node {
  const { style, onChangeText, onSubmitEditing, enablesReturnKeyAutomatically } = props;

  // We should replace the fixme with
  // `React$ElementRef<typeof TextInput>` when we can. Currently, that
  // would make `.current` be `any(implicit)`, which we don't want;
  // this is probably down to bugs in Flow's special support for React.
  const textInputRef = useRef<$FlowFixMe>();

  const [value, setValue] = useState<string>('');

  const themeContext = useContext(ThemeContext);

  // When the route is focused in the navigation, focus the input.
  // Otherwise, if you go back to this screen from the auth screen, the
  // input won't be focused.
  useFocusEffect(
    useCallback(() => {
      if (textInputRef.current) {
        // Sometimes the effect of this `.focus()` is immediately undone
        // (the keyboard is closed) by a Keyboard.dismiss() from React
        // Navigation's internals. Seems like a complex bug, but the symptom
        // isn't terrible, it just means that on back-navigating to this
        // screen, sometimes the keyboard flicks open then closed, instead
        // of just opening. Shrug. See
        //   https://chat.zulip.org/#narrow/stream/243-mobile-team/topic/realm-input/near/1346690
        //
        // `.current` is not type-checked; see definition.
        textInputRef.current.focus();
      }
    }, []),
  );

  const handleChange = useCallback(
    (_value: string) => {
      setValue(_value);
      onChangeText(_value);
    },
    [onChangeText],
  );

  useRn19366Workaround(textInputRef);

  return (
    <View style={[styles.wrapper, style]}>
      <TextInput
        value={value}
        placeholder="your-org.zulipchat.com"
        placeholderTextColor={HALF_COLOR}
        style={[styles.realmInput, { color: themeContext.color }]}
        autoFocus
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="go"
        onChangeText={handleChange}
        blurOnSubmit={false}
        keyboardType="url"
        underlineColorAndroid="transparent"
        onSubmitEditing={onSubmitEditing}
        enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
        ref={textInputRef}
      />
    </View>
  );
}
