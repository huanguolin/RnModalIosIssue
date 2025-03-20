/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

// My workaround for Modal
import MyModal from './MyModal';

function App(): React.JSX.Element {
  const [isFirstModalVisible, setFirstModalVisible] = useState(false);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);

  const openFirstModal = React.useCallback(() => {
    setFirstModalVisible(true);
  }, []);

  const closeFirstModal = React.useCallback(() => {
    setFirstModalVisible(false);
  }, []);

  const openSecondModalAndCloseFirst = React.useCallback(() => {
    setFirstModalVisible(false);
    setSecondModalVisible(true);

    // Automatically close the second modal after 100ms
    setTimeout(() => {
      setSecondModalVisible(false);
    }, 100);
  }, []);

  const modal1Ref = React.useRef(null);
  const modal2Ref = React.useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.button} onPress={openFirstModal}>
          <Text style={styles.buttonText}>Open First Modal</Text>
        </TouchableOpacity>

        {/* First Modal */}
        <MyModal
          ref={modal1Ref}
          onShow={() => console.log('---> handleShow', (modal1Ref.current as any)?._identifier)}
          onDismiss={() => console.log('---> handleDismiss', (modal1Ref.current as any)?._identifier)}
          animationType="slide"
          transparent={true}
          visible={isFirstModalVisible}
          onRequestClose={closeFirstModal}>
          <View style={styles.centeredView}>
            <View style={styles.upperModalView}>
              <Text style={styles.modalTitle}>First Modal</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.leftButton]}
                  onPress={openSecondModalAndCloseFirst}>
                  <Text style={styles.buttonText}>Action with loading</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.rightButton]}
                  onPress={closeFirstModal}>
                  <Text style={styles.buttonText}>Close Modal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </MyModal>

        {/* Loading Modal (Auto-closes after 100ms) */}
        <MyModal
          ref={modal2Ref}
          onShow={() => console.log('---> handleShow', (modal2Ref.current as any)?._identifier)}
          onDismiss={() => console.log('---> handleDismiss', (modal2Ref.current as any)?._identifier)}
          animationType="fade"
          transparent={true}
          visible={isSecondModalVisible}>
          <View style={styles.loadingContainer}>
            <View style={styles.loadingIndicator}>
              <Text style={styles.loadingText}>Loading...(second modal)</Text>
            </View>
          </View>
        </MyModal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperModalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    top: '25%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingIndicator: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingText: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalButton: {
    width: '48%',
    padding: 10,
    borderRadius: 10,
  },
  leftButton: {
    backgroundColor: '#4CAF50',
  },
  rightButton: {
    backgroundColor: '#F44336',
  },
});

export default App;
