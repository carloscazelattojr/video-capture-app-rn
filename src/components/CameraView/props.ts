import { Camera } from "expo-camera"

export interface CameraViewProps {
    cameraRef: React.RefObject<Camera>,
    isRecord: boolean,
    onRecording: () => void,
    onStopRecording: () => void,
};