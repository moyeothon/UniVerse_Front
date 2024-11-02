import "./MeetMain.css";
import { useState, useRef, useEffect } from "react";
import useDetectClose from './UseDetectClose';
import { RegionDropDown } from './RegionDropDown';
import profile from './images/profile.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MeetMain() {
  const navigate = useNavigate();
  const dropDownRef = useRef();
  const [RegionIdentify, setRegionIdentify] = useState('');
  const RegionList = ['서울', '경기', '인천', '강원', '광주', '대구', '대전', '울산', '충북', '충남', '전남', '전북', '경북', '경남', '제주'];
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [meetPost, setMeetPost] = useState([]); 
  const [selectedRegion, setSelectedRegion] = useState(''); 
  const postsPerPage = 4; 

  useEffect(() => {
    const fetchPosts = async () => {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const response = await axios.get('http://moyeothon.limikju.com:8080/api/meetings', {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          }
        });

        if (response.data.isSuccess) {
          setMeetPost(response.data.result); 
          console.log("Fetched posts:", response.data.result);  // 배열 전체를 출력
        } else {
          console.error('Failed to fetch post:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategory(selectedCategory === category ? "" : category);
    setCurrentPage(1); 
  };

  const viewMeetDetail = (postId) => {
    navigate(`/MeetDetail/${postId}`);
  };

  const filteredPosts = meetPost.filter(post => {
    const matchesCategory = selectedCategory ? post.cinema === selectedCategory : true;
    const matchesRegion = selectedRegion ? post.location === selectedRegion : true;
    return matchesCategory && matchesRegion;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="MeetMain_container">
      <div className="MeetMain_title">Meet</div>
      <div className="MeetMain_category">
        <div className="MeetMain_category_cinema">
          {["CGV", "롯데시네마", "MEGABOX", "기타"].map(category => (
            <div
              key={category}
              className={`MeetMain_cinema_${category} ${selectedCategory === category ? "active" : ""}`}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <div className="MeetMain_category_region" ref={dropDownRef}>
          <input
            onClick={() => setIsOpen(!isOpen)}
            type='button'
            value={RegionIdentify || "지역 선택"}
          />
          {isOpen &&
            <ul>
              {RegionList.map((value, index) => (
                <RegionDropDown
                  key={index}
                  value={value}
                  setIsOpen={setIsOpen}
                  setRegionIdentify={(region) => {
                    setRegionIdentify(region);
                    setSelectedRegion(region);
                  }}
                  isOpen={isOpen}
                />
              ))}
            </ul>
          }
        </div>
      </div>
      <div className="MeetMain_contents_goWrite" onClick={() => navigate("/meetWrite")}>+</div>
      {currentPosts.map((post) => (
        <div className="MeetMain_contents" key={post.id} onClick={() => viewMeetDetail(post.id)}>
          <div className="MeetMain_contents_top">
            <span>
              <div className="MeetMain_contents_profile_img">
                <img src={profile} alt="profile-img" />
              </div>
              <div className="MeetMain_contents_userNick">{post.host?.nickname || "Unknown"}</div>
            </span>
            <div className="MeetMain_contents_daysAgo">1일 전</div>
          </div>
          <div className="MeetMain_contents_sub">{post.contents}</div>
          <div className="MeetMain_contents_bottom">
            <span>{post.cinema}</span>
            <span>{post.location}</span>
          </div>
        </div>
      ))}
      <div className="MeetMain_pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}
