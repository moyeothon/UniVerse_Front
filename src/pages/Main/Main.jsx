import React from 'react'
import './Main.css'

export default function Main() {
    return (
        <div className='mainPage'>
            <div className='mainLogo'>Logo</div>
            <div className='mainContainer'>
                <div><img src="/img/moviePoster.png" alt="moviePoster" className='mainPoster' /></div>
                <div className='mainInfo'>
                    <div className='mainInfoTitle'>인사이드 아웃2(2024)</div>
                    <div className='mainInfoSummary'>영화 소개</div>
                    <div className='mainInfoContent'>
                        <div className='mainInfoContentNumber'>N</div>
                        <div className='mainInfoContentText'>명이 이 영화를 추천해요!👍🏻</div>
                    </div>
                </div>
            </div>
        </div>
    )
}