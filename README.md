# React Native Modal iOS Bug

This repository demonstrates a critical iOS-specific bug in React Native's Modal component. When closing a first modal while opening a second modal, and then quickly closing the second modal, the second modal's native layer fails to dismiss properly on iOS, leaving an invisible layer that blocks user interaction with the UI.

## Bug Description

**Platform affected:** iOS only

**Behavior:** 
1. When the first modal is closed while simultaneously opening a second modal
2. And the second modal is closed shortly after (within ~100ms)
3. The second modal's native layer remains on screen as an invisible layer
4. This invisible layer blocks all user interactions with the underlying UI
5. The app becomes unresponsive to touch events
6. **The application is completely unusable and must be force-killed**

## Steps to Reproduce

1. Clone this repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. For iOS, install CocoaPods dependencies:
   ```sh
   bundle install
   bundle exec pod install --project-directory=ios
   ```
4. Run the app on an iOS device or simulator:
   ```sh
   npm run ios
   ```
5. Once the app is running:
   - Tap the "Open First Modal" button
   - Inside the first modal, tap the "Action with loading" button
     (This closes the first modal and opens a second "loading" modal that auto-closes after 100ms)
   - Observe that after both modals disappear, the app's UI is unresponsive
   - **Note: At this point, the app is completely frozen and the only solution is to force-kill the application**

## Console Output During Reproduction

When reproducing this issue, the following console output is observed:

```sh
Welcome to React Native DevTools
Debugger integration: iOS Bridgeless (RCTHost)
Running "RnModalIosIssue" with {"rootTag":1,"initialProps":{},"fabric":true}
---> handleShow 0
---> handleDismiss 1
---> handleDismiss 0
```

## Workaround

A workaround for this issue is available in the `workaround` branch. When using the workaround, the console output shows proper modal opening and closing sequence:

```sh
Welcome to React Native DevTools
Debugger integration: iOS Bridgeless (RCTHost)
Running "RnModalIosIssue" with {"rootTag":1,"initialProps":{},"fabric":true}
---> handleShow 0
---> handleDismiss 0
---> handleShow 1
---> handleDismiss 1
```

## Implementation Details

The issue occurs with the following modal interaction pattern in `App.tsx`:

```tsx
// When closing first modal and opening second
const openSecondModalAndCloseFirst = React.useCallback(() => {
  setFirstModalVisible(false);
  setSecondModalVisible(true);

  // Automatically close the second modal after 100ms
  setTimeout(() => {
    setSecondModalVisible(false);
  }, 100);
}, []);
```

## Environment

- React Native: 0.77.1
- React: 18.3.1
- iOS Version tested: 16, 18
- New Architecture: Enabled

## Additional Notes

- This issue only occurs on iOS devices
- The issue appears to be related to how iOS handles the native modal dismissal when rapidly opening and closing multiple modals 
- **The severity of this bug cannot be overstated - it renders the application completely unusable, requiring a force-kill** 