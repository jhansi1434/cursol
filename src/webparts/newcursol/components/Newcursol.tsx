import * as React from 'react';
//import styles from './Newcursol.module.scss';
import { INewcursolProps } from './INewcursolProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import  Carousel  from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.css";
//import * as jQuery from 'jquery';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';


export interface ISliderCarouselListItem{
  Title: string;
  
 ImageURL1:any,
  RedirectUrl:any
}
export interface ISliderCarouselDemoState{
  value : ISliderCarouselListItem[];
}
export default class Newcursol extends React.Component<INewcursolProps,ISliderCarouselDemoState > {
   public constructor(props:INewcursolProps,state:ISliderCarouselDemoState){
    super(props);
    this.state = {
      value: []
    }   
  }


  private getCarouselListContent = () => {   
    try {
       let requestUrl = `${this.props.absoluteURL}/_api/web/Lists/
 GetByTitle('${this.props.listName}')/Items`;
        this.props.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1)
       .then((response: SPHttpClientResponse) : Promise<ISliderCarouselDemoState> =>{
         if(response.ok){
           return response.json();
         } 
       }).then((item:any) => {      
         if (item!=null){ 
         try{            
               this.setState(({  
                 value: item.value             
               }));            
             }
             catch(err){        
             }
           }
         });
        } catch (error) {    
       console.log('error in service ', error);  
     }
    }


    componentDidMount = () => {       
      this.getCarouselListContent();
    } 
  public render(): React.ReactElement<INewcursolProps> {
    let collection = this.state.value;
console.log('Collection ', collection);
    // const {
    //   description,
    //   isDarkTheme,
    //   environmentMessage,
    //   hasTeamsContext,
    //   userDisplayName
    // } = this.props;

    return (
      // <div>
      //   <h1>hello world</h1>
      // </div>
<>
{/* <div className={ styles.sliderCarouselDemo }> */}
<Carousel >   
{collection.length> 0 && collection.map((data, index) =>{ 
  return(         
      <Carousel.Item>
      <a href={data.RedirectUrl['Url']}>
      <img
        className="d-block w-100"
        src={data.ImageURL1['Url']}
        alt="image1"
      />
      <Carousel.Caption>
        <h3>{data.Title}</h3>
        {/* <p>{data.Description}</p>         */}
      </Carousel.Caption>
      </a>    
      </Carousel.Item>    
      ) 
    })}   
    </Carousel>
      {/* </div> */}
      </>
      // <section className={`${styles.newcursol} ${hasTeamsContext ? styles.teams : ''}`}>
      //   <div className={styles.welcome}>
      //     <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
      //     <h2>Well done, {escape(userDisplayName)}!</h2>
      //     <div>{environmentMessage}</div>
      //     <div>Web part property value: <strong>{escape(description)}</strong></div>
      //   </div>
      //   <div>
      //     <h3>Welcome to SharePoint Framework!</h3>
      //     <p>
      //       The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
      //     </p>
      //     <h4>Learn more about SPFx development:</h4>
      //     <ul className={styles.links}>
      //       <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
      //       <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
      //     </ul>
      //   </div>
      // </section>
    );
  }
}
