import './Cinelog.css';
import { Cineloglist } from '../../components/CinelogList/Cineloglist';
export const Cinelog = () => {
    return (
        <div className='frame'>
            <div className='d-title'>Cinelog</div>
            <div>
                <Cineloglist></Cineloglist>
            </div>
        </div>
    );
}
