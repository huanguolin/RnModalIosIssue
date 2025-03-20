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
  Modal,
} from 'react-native';

function App(): React.JSX.Element {
  const [isFirstModalVisible, setFirstModalVisible] = useState(false);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);

  const openFirstModal = () => {
    setFirstModalVisible(true);
  };

  const closeFirstModal = () => {
    setFirstModalVisible(false);
  };

  const openSecondModalAndCloseFirst = () => {
    setFirstModalVisible(false);
    setSecondModalVisible(true);
  };

  const closeSecondModal = () => {
    setSecondModalVisible(false);
  };

  const handleDismiss = React.useCallback(() => {
    console.log('---> handleDismiss', (modalRef.current as any)?._identifier);
  }, []);

  const handleShow = React.useCallback(() => {
      console.log('---> handleShow', (modalRef.current as any)?._identifier);
  }, []);

  // 创建一个 ref 来引用 Modal 组件
  const modalRef = React.useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.button} onPress={openFirstModal}>
          <Text style={styles.buttonText}>Open First Modal</Text>
        </TouchableOpacity>

        {/* First Modal (Upper Half) */}
        <Modal
          ref={modalRef}
          onShow={handleShow}
          onDismiss={handleDismiss}
          animationType="slide"
          transparent={true}
          visible={isFirstModalVisible}
          onRequestClose={closeFirstModal}>
          <View style={styles.centeredView}>
            <View style={styles.upperModalView}>
              <Text style={styles.modalTitle}>First Modal (Upper Half)</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.leftButton]}
                  onPress={openSecondModalAndCloseFirst}>
                  <Text style={styles.buttonText}>Open Second Modal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.rightButton]}
                  onPress={closeFirstModal}>
                  <Text style={styles.buttonText}>Close Modal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Second Modal (Lower Half) */}
        <Modal
          ref={modalRef}
          onShow={handleShow}
          onDismiss={handleDismiss}
          animationType="slide"
          transparent={true}
          visible={isSecondModalVisible}
          onRequestClose={closeSecondModal}>
          <View style={styles.centeredView}>
            <View style={styles.lowerModalView}>
              <Text style={styles.modalTitle}>Second Modal (Lower Half)</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeSecondModal}>
                <Text style={styles.buttonText}>Close Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  lowerModalView: {
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
    bottom: '25%',
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
  closeButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
});

export default App;
