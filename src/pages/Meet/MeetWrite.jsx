import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './MeetWrite.css';
import useDetectClose from './UseDetectClose';

const cinemaOptions = ["CGV", "롯데시네마", "MEGABOX", "기타"];
const regionOptions = ["서울", "경기", "인천", "강원", "광주", "대구", "대전", "울산", "충북", "충남", "전남", "전북", "경북", "경남", "제주"];

export default function MeetWrite() {
  const dropDownCinemaRef = useRef();
  const dropDownRegionRef = useRef();
  const [title, setTitle] = useState("");
  const [contents, setContent] = useState("");
  const [chatUrl, setLink] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isCinemaOpen, setIsCinemaOpen] = useDetectClose(dropDownCinemaRef, false);
  const [isRegionOpen, setIsRegionOpen] = useDetectClose(dropDownRegionRef, false);
  const navigate = useNavigate();

      const accessToken = localStorage.getItem('accessToken');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://moyeothon.limikju.com:8080/api/meetings', {
        title,
        contents,
        chatUrl,
        cinema: selectedCinema,
        location: selectedRegion,
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        }
      });
      if (response.status === 200) {
        alert("등록 성공!");
        navigate('/meetMain');
      }
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <div className="MeetWrite_container">
      <div className="MeetWrite_top_container">
        <div className="MeetWrite_top">모집글 작성하기</div>
        <div className="MeetWrite_submit_button">
          <button onClick={handleSubmit}>등록하기</button>
        </div>
      </div>
      <div className="MeetWrite_contents_container">
        <div className="MeetWrite_title_container">
          <div>
            <label>
              <input
                type="text"
                className="MeetWrite_Title"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
          </div>

          {/* 영화관 드롭다운 */}
          <div className="MeetWrite_category_cinema" ref={dropDownCinemaRef}>
            <input
              onClick={() => setIsCinemaOpen(!isCinemaOpen)}
              type='button'
              value={selectedCinema || "영화관 선택"}
            />
            {isCinemaOpen && (
              <ul>
                {cinemaOptions.map((cinema, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedCinema(cinema);
                      setIsCinemaOpen(false);
                    }}
                  >
                    {cinema}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 지역 드롭다운 */}
          <div className="MeetWrite_category_region" ref={dropDownRegionRef}>
            <input
              onClick={() => setIsRegionOpen(!isRegionOpen)}
              type='button'
              value={selectedRegion || "지역 선택"}
            />
            {isRegionOpen && (
              <ul>
                {regionOptions.map((region, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedRegion(region);
                      setIsRegionOpen(false);
                    }}
                  >
                    {region}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <label>
            <textarea
              className="MeetWrite_content"
              placeholder="내용을 입력해주세요"
              value={contents}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="text"
              className="MeetWrite_link"
              placeholder="오픈채팅 링크를 입력해주세요"
              value={chatUrl}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </label>
        </div>
      </div>
    </div>
  );
}
