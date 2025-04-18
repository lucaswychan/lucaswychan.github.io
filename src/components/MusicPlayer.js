// components/MusicPlayer.js
import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const MusicPlayer = ({ songData }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);
    
    useEffect(() => {
        const audioElement = audioRef.current;
        
        const updateProgress = () => {
            if (audioElement) {
                const duration = audioElement.duration || 0;
                const currentTime = audioElement.currentTime || 0;
                setProgress((currentTime / duration) * 100);
            }
        };
        
        if (audioElement) {
            audioElement.addEventListener('timeupdate', updateProgress);
            audioElement.addEventListener('ended', () => setIsPlaying(false));
        }
        
        return () => {
            if (audioElement) {
                audioElement.removeEventListener('timeupdate', updateProgress);
                audioElement.removeEventListener('ended', () => setIsPlaying(false));
            }
        };
    }, []);
    
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error("Error playing audio:", error);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);
    
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);
    
    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };
    
    const toggleMute = () => {
        setIsMuted(!isMuted);
    };
    
    const handleProgressClick = (e) => {
        if (audioRef.current) {
            const progressBar = e.currentTarget;
            const rect = progressBar.getBoundingClientRect();
            const clickPosition = (e.clientX - rect.left) / rect.width;
            
            audioRef.current.currentTime = clickPosition * audioRef.current.duration;
        }
    };
    
    if (!songData) return null;
    
    return (
        <div className="music-player glass-effect position-relative p-3 rounded-3 mb-4">
            <audio ref={audioRef} src={songData.audioUrl} preload="metadata" />
            
            <div className="d-flex align-items-center mb-2">
                <div className="album-cover me-3">
                    <img 
                        src={songData.coverArt} 
                        alt={`${songData.title} cover art`} 
                        className="rounded shadow-sm"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                    />
                </div>
                <div className="song-info flex-grow-1">
                    <h5 className="m-0 small title-underline" style={{ color: 'var(--primary)' }}>Currently Listening</h5>
                    <p className="mb-0 fw-semibold">{songData.title}</p>
                    <p className="text-muted small mb-0">{songData.artist}</p>
                </div>
                <div className="controls d-flex">
                    <button 
                        onClick={togglePlay} 
                        className="btn btn-sm text-primary me-2 rounded-circle"
                        style={{ width: '36px', height: '36px', backgroundColor: 'rgba(26, 110, 160, 0.1)' }}
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button 
                        onClick={toggleMute} 
                        className="btn btn-sm text-primary rounded-circle"
                        style={{ width: '36px', height: '36px', backgroundColor: 'rgba(26, 110, 160, 0.1)' }}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                </div>
            </div>
            
            <div 
                className="progress-bar position-relative" 
                style={{ height: '4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '2px', cursor: 'pointer' }}
                onClick={handleProgressClick}
            >
                <div 
                    className="progress-fill position-absolute top-0 start-0 h-100" 
                    style={{ 
                        width: `${progress}%`, 
                        background: 'var(--primary-gradient)',
                        borderRadius: '2px',
                        transition: 'width 0.1s linear'
                    }}
                ></div>
            </div>
            
            <div className="position-absolute" style={{
                width: '40px',
                height: '40px',
                background: 'var(--accent)',
                borderRadius: '50%',
                top: '-10px',
                right: '-10px',
                opacity: '0.1',
                zIndex: '0'
            }}></div>
        </div>
    );
};

export default MusicPlayer; 