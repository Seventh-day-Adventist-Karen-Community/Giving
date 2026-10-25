import React from 'react'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { MainCarouselContent, SectionContent } from '../types/sectionContent';

function serialize_homepages(data:any):SectionContent[]{
    return data.edges.map((section:any) => {
        return({
            ...section.node,
            bg_dark: section.node.bgDark,
            actions: section.node.actionSet.edges.map((action:any) =>{
                return({
                    ...action.node
                })
            }),
            carousel: section.node.carouselSet.edges.map((carousel:any)=>{
                return({
                    ...carousel.node
                })
            })
        })
    })
}

const homepage_sections = async () => {
    const {data} = await client.query({
        query: gql`
        query HomePageSection{
            homepages(visible:true){
              edges{
                node{
                  id
                  title
                  reverse
                  sequenceNo
                  message
                  bgDark
                  center
                  image
                  bgImage
                  bgImageLeft
                  bgImageRight
                  indent
                  isCountdown
                  CountDownTo
                  startDate
                  endDate
                  actionSet{
                    edges{
                      node{
                        path
                        id
                        text
                        primary
                        sequenceNo
                      }
                    }
                  }
                  carouselSet{
                    edges{
                      node{
                        id
                        image
                        link
                        sequenceNo
                      }
                    }
                  }
                }
              }
            }
            mainCarousels(visible:true){
              edges{
                node{
                  id
                  sequenceNo
                  image
                  bgImage
                  title
                  dark
                  description
                  justify
                }
              }
            }
          }                         
        `
    })
    const homepages:SectionContent[] =  serialize_homepages(data.homepages)
    const carousels:MainCarouselContent[] =  data.mainCarousels.edges.map((mainCarousel:any) =>{
      return({
        ...mainCarousel.node
      })
    })
  return {homepages, carousels}
}

export default homepage_sections
