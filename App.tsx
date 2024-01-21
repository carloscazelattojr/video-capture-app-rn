import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';

import { Camera, CameraRecordingOptions } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

import { VideoPlayer } from './src/components/VideoPlayer';
import { CameraView } from './src/components/CameraView';

export default function App() {

  const cameraRef = useRef<Camera>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [video, setVideo] = useState<any>(null);

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState<boolean>(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false);


  useEffect(() => {

    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermisson = await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMicrophonePermission(microphonePermisson.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');

    })();
  }, []);


  if (hasCameraPermission === false || hasMicrophonePermission === false) {
    return <Text>Sem permissão de câmera ou áudio</Text>
  }

  if (hasMediaLibraryPermission === false) {
    return <Text>Sem permissão de acesso a biblicoteca de mídias</Text>
  }

  const recordVideo = () => {
    setIsRecording(true);
    const options: CameraRecordingOptions = { quality: "1080p", maxDuration: 120, mute: true };

    if (cameraRef && cameraRef.current) {
      cameraRef.current.recordAsync(options).then((recordedVideo: any) => {
        setVideo(recordedVideo);
        setIsRecording(false);
      })
    }
  };

  const stopRecordVideo = () => {
    setIsRecording(false);
    if (cameraRef && cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  if (video) {

    const saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    const shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      })
    };

    const discardVideo = () => {
      setVideo(undefined);
    };

    return (
      <VideoPlayer
        video={video}
        onShare={shareVideo}
        onSave={saveVideo}
        onDiscard={discardVideo}
      />
    );
  }


  return (
    <>
      <CameraView
        cameraRef={cameraRef}
        isRecord={isRecording}
        onRecording={recordVideo}
        onStopRecording={stopRecordVideo}
      />
      <StatusBar style='light' />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
