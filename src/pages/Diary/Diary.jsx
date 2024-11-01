import './Diary.css';
import React, { useState } from 'react';
import searchicon from './assets/search.svg';
import ngood from './assets/n-good.svg';
import wgood from './assets/w-good.svg';
import nbad from './assets/n-bad.svg';
import wbad from './assets/w-bad.svg'
import camera from './assets/camera.svg';


export const Diary = () => {
    const [images, setImages] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [place, setPlace] = useState('');
    const [review, setReview] = useState('');

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
    
        const newFiles = files.slice(0, 2 - images.length);
        
        newFiles.forEach(file => {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImages(prev => {
              if (prev.length >= 2) return prev;
              return [...prev, {
                url: e.target.result,
                name: file.name
              }];
            });
          };
          reader.readAsDataURL(file);
        });
      };
    
      const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
      };

      const [ratings, setRatings] = useState({
        acting: 0,
        directing: 0,
        scenario: 0,
        music: 0,
        visual: 0
    });

    const handleStarClick = (id, rating) => {
        setRatings((prev) => {
            return {
                ...prev,
                [id] : rating
,
            };
        })
    }

    const handleRecommendation = (buttonType) => {
        setRecommendValue(buttonType);
    };

    const handleMovieSelect = (e) => {
        setSelectedMovie(e.target.value);
    };
    
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };
    
    const handlePlaceChange = (e) => {
        setPlace(e.target.value);
    };
    
    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const [isOn, setOn] = useState(false);
    const [recommendValue, setRecommendValue] = useState(false);

    const toggleHandler = () => {
        setOn(!isOn)
        setRecommendValue(!recommendValue)
    };


    return (
        <div className='frame'>
            <div className='d-title'>Diary</div>

                <div className={`r-squre ${isOn ? "squre-N" : "squre-W"}`} onClick={toggleHandler}>
                    <div className={`toggle ${isOn ? "toggle-N" : "toggle-W"}`}>{isOn? "공개":"비공개"}</div>
                </div>


            <div className='d-container'>
                <div className='d-box'>
                    <div className='section'>
                        <div className='section-number'>01 l</div>
                        <div className='section-title'>영화선택</div>         
                    </div>
                    <div className='search-container'>
                        <input 
                            className='search-input'
                            type="text"
                            placeholder='영화를 선택해주세요.'
                            value={selectedMovie}
                            onChange={handleMovieSelect} 
                        />
                        <img className='search-icon' src={searchicon} alt="search" /> 
                        <div className='s-list'>
                            <span className='s-list-item'>베놈</span>
                        </div>
                         
                    </div>
                </div>
                <div className='d-box'>
                    <div className='section'>
                        <div className='section-number'>02 l</div>
                        <div className='section-title'>날짜 선택</div>         
                    </div>
                    <div className='search-container'>
                        <input 
                            className='date-input'
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>
                <div className='d-box'>
                    <div className='section'>
                        <div className='section-number'>03 l</div>
                        <div className='section-title'>장소</div>         
                    </div>
                    <div className='search-container'>
                        <input 
                            className='search-input'
                            type="text"
                            placeholder='장소를 입력해주세요.' 
                            value={place}
                            onChange={handlePlaceChange}
                        />

                    </div>
                </div>

                <div className='d-box'>
                    <div className='section'>
                        <div className='section-number'>04 l</div>
                        <div className='section-title'>이미지 업로드</div>         
                    </div>
                    

                    <div className="upload-container">

                        {images.map((image, index) => (
                            <div key={index} className="image-wrapper">
                                <img
                                    src={image.url}
                                    alt={`${index}`}
                                    className="preview-image"
                                />
                                <button
                                    onClick={() => removeImage(index)}
                                    className="delete-button"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        

                        {images.length < 2 && (
                            <label htmlFor={`image-upload-${images.length}`} className="upload-label">
                                <div className="upload-box">
                                    <img className='upload-icon' src={camera} alt="camera" />
                                    
                                    <div className="upload-text">파일 추가하기</div>
                                </div>
                                <input
                                    id={`image-upload-${images.length}`}
                                    type="file"
                                    accept="image/*"
                                    className="file-input"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        )}
                    </div>
                                                 


                </div>

                <div className='d-box'>
                    <div className='section'>
                        <div className='section-number'>05 l</div>
                        <div className='section-title'>요소별 평가</div>         
                    </div>
                    <div className='search-container'>
                    <div className='rr-box'>
                            {[
                                { id: 'acting', label: '연기' },
                                { id: 'directing', label: '연출' },
                                { id: 'scenario', label: '각본' },
                                { id: 'music', label: '음악' },
                                { id: 'visual', label: '영상미' }
                            ].map(item => (
                                <div key={item.id} className="rating-box">
                                    <div className="r-text">{item.label}</div>
                                    <div className="star-rating">
                                        {[1,2,3,4,5].map((star)=> (
                                            <span className={ratings[item.id] >= star ? "star-active" : "star"} onClick={() => handleStarClick(item.id, star)}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <textarea
                                className="review-textarea"
                                placeholder="영화를 보고 남기고 싶은 생각을 적어보세요."
                                value={review}
                                onChange={handleReviewChange}
                            />


                        </div>

                    </div>
                </div>

                <div className='d-box'>
                    <div className='section'>
                        <div className='section-number'>06 l</div>
                        <div className='section-title'>이 영화를 다른사람에게...</div>         
                    </div>
                    <div className='search-container'>
                        <div className='button-container'>
                            <button 
                                className={`updownBn ${recommendValue ? 'active' : ''}`}
                                onClick={() => handleRecommendation(1)}
                            >
                                추천해요
                                <img style={{background:'none'}} src={recommendValue ? wgood : ngood} alt="추천" />
                                
                            </button>
                            <button 
                                className={`updownBn ${recommendValue ? '' : 'active'}`}
                                onClick={() => handleRecommendation(0)}
                            >
                                비추천해요
                                <img style={{background:'none'}} src={recommendValue ? nbad : wbad} alt="비추천" />
                            </button>
                        </div>

                    </div>
                </div>

                <button className='submit-button' >
                    등록하기
                </button>

            </div>

           
        </div>

    );
};