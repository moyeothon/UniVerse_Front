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
  const [posts, setPosts] = useState([]); 
  const [selectedRegion, setSelectedRegion] = useState(''); 
  const postsPerPage = 4; 

  // const dummyPosts = [
  //   {
  //     nickname: '홍길동',
  //     dayAgo: '1일 전',
  //     content: '10/30일 건대 CGV에서 7시 영화 보실분~',
  //     cinema: 'CGV',
  //     region: '서울'
  //   },
  //   {
  //     nickname: '김철수',
  //     dayAgo: '2일 전',
  //     content: '강남 메가박스에서 영화 볼 사람~',
  //     cinema: 'MEGABOX',
  //     region: '경기'
  //   },
  //   {
  //     nickname: '이영희',
  //     dayAgo: '3일 전',
  //     content: '롯데시네마에서 새로운 영화를 보고 싶어요.',
  //     cinema: '롯데시네마',
  //     region: '서울'
  //   },
  //   {
  //     nickname: '박철수',
  //     dayAgo: '5일전',
  //     content: 'CGV에서 데이트 할 사람 구해요!',
  //     cinema: 'CGV',
  //     region: '부산'
  //   },
  //   {
  //     nickname: '최길동',
  //     dayAgo: '10일 전',
  //     content: '영화 보고 싶으신 분은 연락주세요!',
  //     cinema: 'MEGABOX',
  //     region: '부산'
  //   }
  // ];


  // const [meetposts, setMeetpost] = useState([]);

  // const calculateDaysAgo = (createdAt) => {
  //   const date1 = new Date(createdAt);
  //   const date2 = new Date();
  //   const diffTime = Math.abs(date2 - date1);
  //   return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  // };

  const [meetPost, setMeetPost] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://moyeothon.limikju.com:8080/api/posts');
            setMeetPost(response.data); 
        } catch (error) {
            console.error('Failed to fetch generalpost', error);
        }
    };

    fetchPosts();
}, []);

  // useEffect(() => {
  //   // 더미 데이터 사용
  //   setPosts(dummyPosts);
  // }, []);

  const toggleCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
      setCurrentPage(1); 
    }
  };

  const viewMeetDetail = async (meetPostId) => {
    try {
        navigate(`/MeetDetail/${meetPostId}`); // meetPostId로 이동
    } catch (error) {
        console.error(error);
    }
};


  // 게시글 필터링 아랫줄 posts를 백 연결후 meetposts로 변경
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory ? post.cinema === selectedCategory : true;
    const matchesRegion = selectedRegion ? post.region === selectedRegion : true;
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
          <div
            className={`MeetMain_cinema_CGV ${
              selectedCategory === "CGV" ? "active" : ""
            }`}
            onClick={() => toggleCategory("CGV")}
          >
            CGV
          </div>
          <div
            className={`MeetMain_cinema_LotteCinema ${
              selectedCategory === "롯데시네마" ? "active" : ""
            }`}
            onClick={() => toggleCategory("롯데시네마")}
          >
            롯데시네마
          </div>
          <div
            className={`MeetMain_cinema_MEGABOX ${
              selectedCategory === "MEGABOX" ? "active" : ""
            }`}
            onClick={() => toggleCategory("MEGABOX")}
          >
            MEGABOX
          </div>
          <div
            className={`MeetMain_cinema_others ${
              selectedCategory === "기타" ? "active" : ""
            }`}
            onClick={() => toggleCategory("기타")}
          >
            기타
          </div>
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
      <div className="MeetMain_contents_goWrite"  onClick={() => navigate("/meetWrite")}>+</div>
      {meetPost.map((post) => (//아래를 key={post.meetpostId} onClick={()=>viewMeetDetail(post.meetpostId)}로 수정 
        <div className="MeetMain_contents"  key={post.meetpostId} onClick={()=>viewMeetDetail(post.meetpostId)}>
          <div className="MeetMain_contents_top">
            <span>
              <div className="MeetMain_contents_profile_img">
                <img src={profile} alt="profile-img" />
              </div>
              <div className="MeetMain_contents_userNick">{post.writer}</div>
            </span>
            <div className="MeetMain_contents_daysAgo">3일 전</div>
          </div>
          <div className="MeetMain_contents_sub">{post.contents}</div>
          <div className="MeetMain_contents_bottom">
            <span>{post.theater}</span>
            <span>{post.region}</span>
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
