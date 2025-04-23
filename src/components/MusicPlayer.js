// components/MusicPlayer.js
import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaSpotify, FaTimes, FaWindowMinimize, FaWindowMaximize } from "react-icons/fa";

const MusicPlayer = ({ songData, visible, onClose, onMinimize, isMinimized }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playError, setPlayError] = useState(false);
    const audioRef = useRef(null);
    const progressRef = useRef(null);
    
    // Check screen size on mount and resize
    useEffect(() => {
        const checkScreenSize = () => {
            // Auto-minimize on small screens
            if (window.innerWidth < 768 && onMinimize) {
                onMinimize(true);
            }
        };
        
        // Check initially
        checkScreenSize();
        
        // Listen for resize events
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [onMinimize]);
    
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
            audioElement.addEventListener('loadedmetadata', () => setDuration(audioElement.duration));
            audioElement.addEventListener('ended', () => {
                setIsPlaying(false);
                setProgress(0);
                audioElement.currentTime = 0;
            });
            
            // Reset play error when audio is loaded
            audioElement.addEventListener('canplaythrough', () => {
                setPlayError(false);
            });
        }
        
        return () => {
            if (audioElement) {
                audioElement.removeEventListener('timeupdate', updateProgress);
                audioElement.removeEventListener('loadedmetadata', () => {});
                audioElement.removeEventListener('ended', () => {});
                audioElement.removeEventListener('canplaythrough', () => {});
            }
        };
    }, []);
    
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);
    
    const togglePlay = async () => {
        if (!audioRef.current) return;
        
        try {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                // Use the Promise returned by play() to handle autoplay restrictions
                const playPromise = audioRef.current.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying(true);
                            setPlayError(false);
                        })
                        .catch(error => {
                            console.error("Playback error:", error);
                            setPlayError(true);
                            setIsPlaying(false);
                        });
                }
            }
        } catch (error) {
            console.error("Error toggling play state:", error);
            setPlayError(true);
            setIsPlaying(false);
        }
    };
    
    const toggleMute = () => {
        setIsMuted(!isMuted);
    };
    
    // Handle minimizing and maximizing the player
    const handleMinimize = () => {
        if (onMinimize) onMinimize(true);
    };
    
    const handleMaximize = () => {
        if (onMinimize) onMinimize(false);
    };
    
    // Set progress when clicking on progress bar
    const setProgressManually = (e) => {
        const width = progressRef.current.clientWidth;
        const clickX = e.nativeEvent.offsetX;
        const percent = (clickX / width) * 100;
        const newTime = (percent / 100) * duration;
        
        audioRef.current.currentTime = newTime;
        setProgress(percent);
    };
    
    // Format time in MM:SS
    const formatTime = (seconds) => {
        if (!seconds) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    };
    
    // Don't render if not visible
    if (!visible) return null;
    
    // Render minimized version
    if (isMinimized) {
        return (
            <div className="music-player-mini">
                <audio ref={audioRef} src={songData.audioUrl} preload="metadata" />
                
                <div className="mini-album-container">
                    <img 
                        src={songData.coverArt} 
                        alt={`${songData.title} album art`} 
                        className={`mini-album ${isPlaying ? 'spinning' : ''}`}
                    />
                    <div className="mini-overlay">
                        <button className="mini-play-btn" onClick={togglePlay}>
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                    </div>
                    
                    <div className="mini-controls">
                        <button onClick={handleMaximize} title="Maximize player">
                            <FaWindowMaximize />
                        </button>
                        <button onClick={onClose} title="Close player">
                            <FaTimes />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    // Render full version
    return (
        <div className="music-player">
            <audio ref={audioRef} src={songData.audioUrl} preload="metadata" />
            
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="m-0 small" style={{ color: 'var(--primary)' }}>Currently Listening</h5>
                <div className="d-flex">
                    <button 
                        onClick={handleMinimize}
                        className="btn btn-sm text-muted p-0 me-2"
                        title="Minimize player"
                    >
                        <FaWindowMinimize />
                    </button>
                    {onClose && (
                        <button 
                            onClick={onClose}
                            className="btn btn-sm text-muted p-0"
                            title="Close player"
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
            </div>
            
            <div className="d-flex align-items-center mb-3">
                <div className="position-relative me-3">
                    <img 
                        src={songData.coverArt} 
                        alt={`${songData.title} cover art`} 
                        className="rounded shadow-sm"
                        style={{ 
                            width: '60px', 
                            height: '60px', 
                            objectFit: 'cover',
                            borderRadius: 'var(--border-radius-md)'
                        }} 
                    />
                    {isPlaying && (
                        <div className="position-absolute bottom-0 end-0 mb-1 me-1">
                            <div className="playing-animation">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex-grow-1">
                    <p className="mb-0 fw-semibold">{songData.title}</p>
                    <p className="text-muted small mb-0">{songData.artist}</p>
                    {playError && (
                        <p className="text-danger small mb-0">
                            Playback blocked by browser. Interact with the page first.
                        </p>
                    )}
                </div>
            </div>
            
            <div className="mb-3">
                <div 
                    className="progress mb-1" 
                    ref={progressRef}
                    onClick={setProgressManually}
                    style={{ 
                        height: '4px', 
                        cursor: 'pointer', 
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: 'var(--border-radius-pill)'
                    }}
                >
                    <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ 
                            width: `${progress}%`, 
                            backgroundColor: 'var(--primary)',
                            borderRadius: 'var(--border-radius-pill)'
                        }} 
                        aria-valuenow={progress} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                    ></div>
                </div>
                <div className="d-flex justify-content-between align-items-center px-1">
                    <span className="small text-muted">
                        {formatTime(duration * progress / 100)}
                    </span>
                    <span className="small text-muted">
                        {formatTime(duration)}
                    </span>
                </div>
            </div>
            
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <button 
                        onClick={togglePlay} 
                        className="btn btn-sm me-2"
                        style={{
                            backgroundColor: isPlaying ? 'var(--primary)' : 'rgba(26, 110, 160, 0.1)',
                            color: isPlaying ? 'white' : 'var(--primary)',
                            width: '38px',
                            height: '38px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 'var(--border-radius-pill)',
                            border: 'none',
                            boxShadow: isPlaying ? '0 2px 5px rgba(0,0,0,0.1)' : 'none'
                        }}
                    >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button 
                        onClick={toggleMute} 
                        className="btn btn-sm" 
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            color: isMuted ? 'var(--muted)' : 'var(--dark-text)',
                            width: '38px',
                            height: '38px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 'var(--border-radius-pill)',
                            border: 'none'
                        }}
                    >
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                </div>
                
                {songData.spotifyLink && (
                    <a 
                        href={songData.spotifyLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn btn-sm d-flex align-items-center text-success"
                        style={{ 
                            fontSize: '0.8rem', 
                            borderRadius: 'var(--border-radius-pill)',
                            backgroundColor: 'rgba(29, 185, 84, 0.1)'
                        }}
                    >
                        <FaSpotify className="me-1" /> Listen
                    </a>
                )}
            </div>
        </div>
    );
};

export default MusicPlayer; 