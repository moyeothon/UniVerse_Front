import './CineLog.css';
import CineLogList from '../../components/CinelogList/Cineloglist';

export const CineLog = () => {
    return (
        <div className='frame'>
            <div className='d-title'>Cine Log</div>
            <div>
                <CineLogList></CineLogList>
            </div>
        </div>
    );
}

export default CineLog;
