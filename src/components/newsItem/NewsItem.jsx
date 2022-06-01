
import "./NewsItem.scss";

const NewsItem = ({date, title, content}) => {
   return (

        <li className="newsItem">
            <div className="newsItemDate">
                {date}
            </div>
            <div className="newsContent">
                <div className="newsItemTitle">
                    {title}
                </div>
                <div className="newsItemContent">
                    {content.slice(0,125)+'...'}
                </div>
            </div>
        </li>   
    )
}

export default NewsItem;