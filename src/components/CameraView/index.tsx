import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { CameraViewProps } from './props';
import { styles } from './styles';
import { Camera } from 'expo-camera';

export function CameraView({ cameraRef, isRecord, onRecording, onStopRecording }: CameraViewProps) {
    return (
        <Camera
            style={styles.container}
            ref={cameraRef}
        >
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={isRecord ? onStopRecording : onRecording}
                >
                    <Text style={styles.textButton}>{isRecord ? 'Stop Record' : 'Start Record'}</Text>
                </TouchableOpacity>
            </View>
        </Camera>
    );
}