import "./AppFooter.scss";

const AppFooter = () => {
    return (
        <footer className="app__footer">

            <div className="information">
                <div className="contacts">
                    Контакт: Лилия Ивановна Гразовская <br/>
                    Телефон:  <a href="tel:+73452597429">8 (3452) 59-74-29</a>
                </div>

                <div className="location">
                    Главный офис:<br/>
                    <a href="https://goo.gl/maps/7QPDnENdJuVbaLgi7" target="_blank" rel="noreferrer">Г. Тюмень, ул. Перекопская 15б</a>
                    
                </div>
            </div>

            <div className="warning">
                Все права защищены.
                При использовании материалов сайта активная прямая ссылка на источник обязательна
            </div>
        </footer>
    )
}

export default AppFooter;