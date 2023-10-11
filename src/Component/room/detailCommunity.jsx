import './community.css'

const DetailCommunity = ({show, noshow}) => {

    const closeModal = () => {
        noshow();
    }
    const Stopmodal = (e) => {
        e.stopPropagation();
    }
    return (
        <div className={`community_modal ${show ? 'show' : ''}`} onClick={closeModal}>
            <div className="detail_modal" onClick={Stopmodal}>

            </div>
        </div>  
    )
}

export default DetailCommunity;