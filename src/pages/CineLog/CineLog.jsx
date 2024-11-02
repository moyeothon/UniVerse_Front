import './CineLog.css';
import Cineloglist from '../../components/CinelogList/Cineloglist';

export const CineLog = () => {
    return (
        <div className='frame'>
            <div className='d-title'>Cine Log</div>
            <div>
                <Cineloglist></Cineloglist>
            </div>
        </div>
    );
}

export default CineLog;
