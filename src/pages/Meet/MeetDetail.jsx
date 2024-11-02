import "./MeetDetail.css";
import backImg from './images/backimg.png';
import userprofile from "./images/profile.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'; 
import { useParams } from "react-router-dom";

export default function MeetDetail() {
  const { id } = useParams(); 
  const [submitComment, setComment] = useState(''); 
  const [MeetItem, setMeetItem] = useState({}); 
  const [boardComments, setBoardComments] = useState([]); 

  // 게시물 데이터 가져오기
  useEffect(() => {
    const fetchMeetItem = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert("로그인이 필요합니다."); // 토큰이 없을 경우 알림
        return;
      }
      try {
        const response = await axios.get(`http://moyeothon.limikju.com:8080/api/meetings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });
        if (response.data.isSuccess) {
          setMeetItem(response.data.result); 
          console.log("Fetched post details:", response.data.result);
        } else {
          console.error("Failed to fetch post details:", response.data.message);
          alert(response.data.message); // 에러 메시지 표시
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
        alert("게시물 정보를 가져오는 중 오류가 발생했습니다.");
      } 
    };
    fetchMeetItem();
  }, [id]);

  // 댓글 가져오기
  const fetchComments = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(`http://moyeothon.limikju.com:8080/api/meetings/${id}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      if (response.data && Array.isArray(response.data.result)) {
        setBoardComments(response.data.result.map(comment => ({
          commentId: comment.commentId,
          content: JSON.parse(comment.content).content, // 댓글 내용 추출
          username: comment.member.username, // 작성자 이름 추출
        })));
        console.log("Fetched comments:", response.data.result);
      } else {
        setBoardComments([]);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      alert("댓글 정보를 가져오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // 댓글 생성
  const handleCommentSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.post(`http://moyeothon.limikju.com:8080/api/meetings/${id}/comments`, {
        content: submitComment      
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, 
        }
      });
      if (response.status === 200) {
        alert('등록이 완료되었습니다.');
        setComment('');
        fetchComments(); 
      }
    } catch (error) {
      console.error('등록 중 오류 발생:', error);
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const navigate = useNavigate();
  const goBackToMeetMain = () => {
    navigate('/meetMain');
  };

  return (
    <div className="MeetDetail-container">
      <div className="back_image2" onClick={goBackToMeetMain}>
        <img src={backImg} alt="back_image" />
      </div>
      <div className="MeetDetail-main-container">
        <div className="Meet-detail-container">
          <div className="Meet-detail-top">
            <div className="detail-profile">
              <div className="detail-profile-img">
                <img src={userprofile} alt="user-img" />
              </div>
              <div className="detail-profile-username">{MeetItem.host?.nickname || "Unknown"}</div>
            </div>
            <div className="Meet-detail-ago">1일 전</div>
          </div>
          <div className="Meet-detail-main">
            <div className="Meet-detail-title">
              <div className="Meet-detail-section">
                <span className="Meet-detail-section1">{MeetItem.cinema}</span>
                <span className="Meet-detail-section2">{MeetItem.location}</span>
              </div>
              <div className="Meet-detail-title">
                {MeetItem.title}
              </div>
            </div>
            <div className="Meet-detail-contents">
              {MeetItem.contents}
              <span className="Meet-detail-link">
                오픈채팅 링크 : {MeetItem.chatUrl}
              </span>
            </div>
          </div>
        </div>

        <div className="Meet-detail-comment-write">
          <label>
            <textarea
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
              <div className="comment-detail-ago">1일 전</div>
            </div>
            <div className="comment-detail-contents">{boardComment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
