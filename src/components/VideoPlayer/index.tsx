import React from 'react';
import { Button, SafeAreaView, View } from 'react-native';

import { Video, Audio } from 'expo-av';

import { VideoPlayerProps } from './props';
import { styles } from './styles';

export function VideoPlayer({ video, onShare, onSave, onDiscard }: VideoPlayerProps) {
    return (
        <SafeAreaView style={styles.container}>
            <Video
                source={{ uri: video.uri }}
                useNativeControls
                style={styles.video}
            />
            <View style={styles.menuButtons}>
                <Button title='Share' onPress={onShare} />
                <Button title='Save' onPress={onSave} />
                <Button title='Discard' onPress={onDiscard} />
            </View>
        </SafeAreaView>
    );
}