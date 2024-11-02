import './CineLogList.css';
import wgood from '../../pages/Diary/assets/w-good.svg';
import nbad from '../../pages/Diary/assets/n-bad.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CineLogList() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isPublic = true; // 사용자의 공개 상태
    const isRecommend = true; // 추천 여부

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get('http://moyeothon.limikju.com:8080/api/records/my', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const fetchedData = response.data.result.content[0];
                console.log(fetchedData);

                setData(fetchedData);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
                setError('데이터를 가져오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    if (!data) return <div>데이터가 없습니다.</div>; // 데이터가 없을 경우 처리

    const { movie, owner, scorePerformer, scoreDirector, scoreArtistry, scoreMusic, scoreVisual, body, imageUrls } = data;

    const ratings = {
        acting: scorePerformer,
        directing: scoreDirector,
        scenario: scoreArtistry,
        music: scoreMusic,
        visual: scoreVisual,
    };

    return (
        <div className='c-container'>
            {movie && (
                <div className='c-header'>
                    <img className='imgsize' src={movie.posterUrl} alt="영화 포스터" />
                    <div className='c-text'>
                        <div className='c-title'>{movie.title}</div>
                        <div className='c-subtitle'>{movie.subtitle}</div>
                        <div className='movie-details'>글쓴이ㅣ{owner?.username}</div>
                        <div className='movie-details'>개봉일 ㅣ {movie.releaseDate}</div>
                        <div className='movie-details'>감독ㅣ{movie.directors}</div>
                        <div className={isRecommend ? "recommend" : "recommend-bad"}>
                            <div className={isRecommend ? "cr-text" : "r-text-bad"}>이 영화를 추천해요</div>
                            <img className='gbicon' src={isRecommend ? wgood : nbad} alt={isRecommend ? "좋아요 아이콘" : "별로예요 아이콘"} />
                        </div>
                    </div>
                </div>
            )}
            <div className={`public ${isPublic ? 'view' : ''}`}>
                <div className='crcontainer'>
                    {[
                        { id: 'acting', label: '연기' },
                        { id: 'directing', label: '연출' },
                        { id: 'scenario', label: '각본' },
                        { id: 'music', label: '음악' },
                        { id: 'visual', label: '영상미' }
                    ].map(item => (
                        <div key={item.id} className="crating-box">
                            <div className="rating-label">{item.label}</div>
                            <div className="cstar-rating">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span
                                        key={star}
                                        className={ratings[item.id] >= star ? "cstar-active" : "cstar"}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='r-imgs'>
                    {imageUrls.length > 0 ? (
                        imageUrls.map((url, index) => (
                            <img key={index} className='record-img' src={url} alt={`이미지 ${index + 1}`} />
                        ))
                    ) : (
                        <div>이미지가 없습니다.</div>
                    )}
                </div>
                <div className='creview-textarea'>
                    <div className='creview'>{body}</div>
                </div>
            </div>
        </div>
    );
}
