import './Diary.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchicon from './assets/search.svg';
import ngood from './assets/n-good.svg';
import wgood from './assets/w-good.svg';
import nbad from './assets/n-bad.svg';
import wbad from './assets/w-bad.svg'
import camera from './assets/camera.svg';

export const Diary = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [url, setUrl] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [place, setPlace] = useState('');
    const [review, setReview] = useState('');
    const [isOn, setOn] = useState(true);
    const [recommendValue, setRecommendValue] = useState(true);
    const [ratings, setRatings] = useState({
        acting: 0,
        directing: 0,
        scenario: 0,
        music: 0,
        visual: 0
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            const fetchMovies = async () => {
                try {
                    const response = await fetch(`http://moyeothon.limikju.com:8080/api/movies`);
                    const data = await response.json();

                    const movieList = data.result && Array.isArray(data.result.content) ? data.result.content : [];
                    console.log("Fetched Movies:", movieList);
                    setMovies(movieList);
                } catch (error) {
                    console.error('Error fetching movies:', error);
                    setMovies([]); 
                }
            };

            fetchMovies();
        } else {
            setMovies([]); 
        }
    }, [searchTerm]);

    const handleMovieClick = (title) => {
        setSearchTerm(title);
        setMovies([]); // 목록을 비워서 선택한 항목만 보여주도록 합니다.
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

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
          handleImg(file);
        });
      };
    
      const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
      };


    const handleStarClick = (id, rating) => {
        setRatings((prev) => {
            return {
                ...prev,
                [id] : rating
            };
        })
    }

    const handleRecommendation = (buttonType) => {
        setRecommendValue(buttonType);
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

    const toggleHandler = () => {
        setOn((prev) => !prev);
        setRecommendValue((prev) => !prev);
    };
    
    const handleImg = async (imageFile) => {
        const formData = new FormData();
        formData.append('image',imageFile);
        
        try{
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://moyeothon.limikju.com:8080/api/records/image',{
                method:'POST',
                headers:{
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
            const data = await res.json();
            const imageUrl = data.result;
            setUrl((prevImages) => {
                console.log("Previous Images:", prevImages);
                console.log("New Image URL:", imageUrl);
                return [...prevImages,imageUrl];
            });
    } catch (error) {
        console.error('Image upload error:', error);
    };
}

    const handleSubmit = async () => {
        const diaryData = {
            movieId : 1,
            title : movies.title,
            body : review,
            summary : '',
            whatchLocation: place,
            scorePerformer : ratings.acting,
            scoreDirector : ratings.directing,
            scoreVisual : ratings.visual,
            scoreMusic : ratings.music,
            scoreArtistry : ratings.scenario,
            watchDate : selectedDate,
            recommend : recommendValue,
            isPublic : isOn,
            imageUrls: url
        }
        
            try {
                const token = localStorage.getItem('accessToken');

                if (!token) {
                    alert('로그인이 필요합니다.');
                    navigate('/login')
                    return ;
                }
                const response = await fetch('http://moyeothon.limikju.com:8080/api/records',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body:JSON.stringify(diaryData)
                });
    
                if(response.status===200){
                    console.log(diaryData);
                    alert('글이 등록되었습니다.');
                    navigate('/cinelog');
                } else {
                    if(response.status === 401) {
                        alert('인증이 만료되었습니다. 다시 로그인해주세요.')
                        navigate('/login');
                        return;
                    }
                }
            }catch(error){
                console.error('Error')
                alert('등록 중 오류가 발생했습니다.')
            }
    }

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
                    <div className="search-container">
        <input 
            className="search-input"
            type="text"
            placeholder="영화를 선택해주세요."
            value={searchTerm}
            onChange={handleSearchChange} 
        />
        <img className="search-icon" src={searchicon} alt="search" /> 

        {movies.length > 0 && 
            movies.map((movie, index) => (
                <div 
                    key={index} 
                    className="s-list" 
                    onClick={() => handleMovieClick(movie.title)} 
                >
                    <span className="s-list-item">
                        {movie.title}
                    </span>
                </div>
            ))
        }
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

                <button className='submit-button' onClick={()=>{handleSubmit()}} >
                    등록하기
                </button>

            </div>

           
        </div>

    );
};