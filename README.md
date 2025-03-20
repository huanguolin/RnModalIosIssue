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

## Additional Notes

- This issue only occurs on iOS devices
- The issue appears to be related to how iOS handles the native modal dismissal when rapidly opening and closing multiple modals 