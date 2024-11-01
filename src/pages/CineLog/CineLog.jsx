import React from 'react'
import './CineLog.css'

export default function CineLog() {
    const movies = Array(4).fill({
        title: '인사이드 아웃2(2024)',
        info: '비상! 새로운 감정들이 몰려온다!',
        poster: '/img/moviePoster.png',
        nickname: '닉네임',
        date: '2024.01.01',
        location: '영화관',
    })

    return (
        <div className='cineLogPage'>
            <div className='cineLogLogo'>Cine Log</div>
            {movies.map((movie, index) => (
                <div className='cineLogContainer' key={index}>
                    <img src={movie.poster} alt="moviePoster" className='cineLogPoster' />
                    <div className='cineLogContent'>
                        <div className='cineLogTitle'>{movie.title}</div>
                        <div className='cineLogInfo'>{movie.info}</div>
                        <div className='cineLogInfoDetail'>
                            <div className='cineLogNickName'>글쓴이 ㅣ {movie.nickname}</div>
                            <div className='cineLogDate'>관람일 ㅣ {movie.date}</div>
                            <div className='cineLogLocation'>장소 ㅣ {movie.location}</div>
                        </div>
                        <div className='cineLogRecommend'>이 영화를 추천해요 👍🏻</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
