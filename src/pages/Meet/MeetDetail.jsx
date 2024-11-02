import "./MeetDetail.css";
import backImg from './images/backimg.png';
import userprofile from "./images/profile.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'; 
import { useParams } from "react-router-dom";

export default function MeetDetail() {
  const { postId } = useParams(); 
  const [submitComment, setComment] = useState(''); // 댓글 상태
  const [MeetItem, setMeetItem] = useState({}); // 게시물 데이터를 저장할 상태
  const [boardComments, setBoardComments] = useState([]); // 댓글 데이터를 저장할 상태

  // 더미 게시물 데이터
  // const dummyMeetItem = {
  //   boardPostId: boardPostId, // 현재 게시물 ID
  //   username: "사용자1",
  //   title: "영화 추천해주세요!",
  //   content: "최근에 재미있게 본 영화가 없어서 추천 받고 싶어요. 추천 부탁드립니다!",
  //   cinema: "CGV",
  //   region:"서울",
  //   link:"http://~~~~~~~~",
  //   createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString
  // };

  // // 더미 댓글 데이터
  // const dummyComments = [
  //   {
  //     commentId: 1,
  //     username: "답변자1",
  //     content: "추천드리는 영화는 '인셉션'입니다. 정말 재미있어요!",
  //     createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1일 전
  //   },
  //   {
  //     commentId: 2,
  //     username: "답변자2",
  //     content: "저는 '타이타닉'을 추천합니다. 감동적이에요.",
  //     createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2일 전
  //   },
  //   {
  //     commentId: 3,
  //     username: "답변자3",
  //     content: "요즘 '오펜하이머'가 화제입니다. 꼭 보세요!",
  //     createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3일 전
  //   },
  // ];

  // 게시물 데이터 가져오기
  useEffect(() => {
    const fetchMeetItem = async () => {
      // API 호출 대신 더미 데이터 사용
      try {
        const response = await axios.get(`http://moyeothon.limikju.com:8080/api/posts/${postId}`);
        const data = response.data;
        console.log(data)
        setMeetItem({
          ...data,
          daysAgo: calculateDaysAgo(data.createdAt),
        }); 
      } catch (error) {
        console.error(error);
      } 
      // setMeetItem({
      //   ...dummyMeetItem,
      //   daysAgo: calculateDaysAgo(dummyMeetItem.createdAt),
      // });
    };

    fetchMeetItem();
  }, [postId]); 
  
  // 댓글 데이터 가져오기
  // const fetchComments = async () => {
    // API 호출 대신 더미 댓글 데이터 사용
    // try {
    //   const response = await axios.get(`http://43.203.243.173:8080/comments/post/${boardPostId}`);
    //   const data = response.data;

    //   if (Array.isArray(data)) {
    //     setBoardComments(data);
    //   } else if (data) {
    //     setBoardComments([data]); // 댓글이 한 개일 경우 객체를 배열로 변환
    //   } else {
    //     setBoardComments([]);
    //   }
    //   console.log(response);
    // } catch (error) {
    //   console.error(error);
    // }
    // setBoardComments(dummyComments);
  // };

  // useEffect(() => {
  //   fetchComments();
  // }, [postId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // 댓글 생성
  const handleCommentSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const data = {
      boardPostId: postId,
      content: submitComment
    };

    try {
      const response = await axios.post(`http://ddd/comments/save`, data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, 
          'Content-cinema': 'application/json', 
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        alert('등록이 완료되었습니다.');
        setComment(''); // 댓글 작성 후 입력 필드 초기화
        // fetchComments(); 
      }
    } catch (error) {
      console.error('등록 중 오류 발생:', error);
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const calculateDaysAgo = (createdAt) => {
    const date1 = new Date(createdAt);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const navigate = useNavigate();
  const MeetMain = () => {
    navigate('/meetMain');
  };

  return (
    <div className="MeetDetail-container">
      <div className="back_image2" onClick={MeetMain}>
        <img src={backImg} alt="back_image" />
      </div>
      <div className="MeetDetail-main-container">
        <div className="Meet-detail-container">
          <div className="Meet-detail-top">
            <div className="detail-profile">
              <div className="detail-profile-img">
                <img src={userprofile} alt="user-img" />
              </div>
              <div className="detail-profile-username">{MeetItem.username}</div>
            </div>
            <div className="Meet-detail-ago">{MeetItem.daysAgo}일 전</div>
          </div>
          <div className="Meet-detail-main">
            <div className="Meet-detail-title">
              <div className="Meet-detail-section">
                <span className="Meet-detail-section1">{MeetItem.cinema}</span>
                <span className="Meet-detail-section2">{MeetItem.region}</span>
              </div>
              <div className="Meet-detail-title">
                {MeetItem.title}
              </div>
            </div>
            <div className="Meet-detail-contents">
              {MeetItem.content}
              <span className="Meet-detail-link">
                {MeetItem.link}
              </span>
            </div>
          </div>
        </div>

        <div className="Meet-detail-comment-write">
          <label>
            <textarea
              cinema="text"
              placeholder="답변을 입력해주세요."
              value={submitComment}
              onChange={handleCommentChange}
            />
          </label>
          <button className="detail-comment-submit-button" onClick={handleCommentSubmit}>답변하기</button>
        </div>
        {Array.isArray(boardComments) && boardComments.map((boardComment) => (
          <div key={boardComment.commentId} className="Meet-detail-comment">
            <div className="comment-detail-top">
              <div className="comment-detail-profile">
                <div className="detail-profile-img">
                  <img src={userprofile} alt="user-img" />
                </div>
                <div className="comment-detail-profile-username">{boardComment.username}</div>
              </div>
              <div className="comment-detail-ago">{calculateDaysAgo(boardComment.createdAt)}일 전</div>
            </div>
            <div className="comment-detail-contents">{boardComment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
