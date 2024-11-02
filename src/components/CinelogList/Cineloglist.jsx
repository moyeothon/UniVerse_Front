import './CineLogList.css';
import wgood from '../../pages/Diary/assets/w-good.svg';
import nbad from '../../pages/Diary/assets/n-bad.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CineLogList= () => {
    const [ratings, setRatings] = useState({
        acting: 0,
        directing: 0,
        scenario: 0,
        music: 0,
        visual: 0,
    });

    const Ispublic = true;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://moyeothon.limikju.com:8080/api/records/my');
                const data = response.data.result.content[0]; // 첫 번째 데이터를 사용

                setRatings({
                    acting: data.scorePerformer,
                    directing: data.scoreDirector,
                    scenario: data.scoreArtistry,
                    music: data.scoreMusic,
                    visual: data.scoreVisual,
                });
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchData();
    }, []);

    const isRecommend = true;
    return (
        <div className='c-container'>
            <div className='c-header'>
                <img className='imgsize' src="" alt="" />
                <div className='c-text'>
                    <div className='c-title'>와일드로봇</div>
                    <div className='c-subtitle'>더넓은세상을</div>
                    <div className='movie-details'>글쓴이ㅣmoesdf</div>
                    <div className='movie-details'>글쓴이ㅣsdfsd</div>
                    <div className='movie-details'>글쓴이ㅣsdfs</div>
                    <div className={isRecommend ? "recommend" : "recommend-bad"}>
                        <div className={isRecommend ? "r-text" : "r-text-bad"}>이 영화를 추천해요</div>
                        <img className='gbicon' src={isRecommend ? wgood : nbad} alt="" />
                    </div>
                </div>
            </div>
            <div className={`public ${Ispublic ? 'view' : ''}`}>
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
                    <img className='record-img' src="" alt="" />
                    <img className='record-img' src="" alt="" />
                </div>
                <div className='creview-textarea'>
                    <div className='creview'>sdf</div>
                </div>
            </div>

            
            
        </div>
    );
}

export default CineLogList;