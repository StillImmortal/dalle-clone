import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"

//Redux types
import { search } from '../utils/redux'

// Components
import { Loader, Card, FormField } from '../components'

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => (<Card key={post._id} {...post} />))
  }

  return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
  )
}

const Home = () => {
  const searchedResults = useSelector(state => state)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState(null)

  const [searchText, setSearchText] = useState('')

  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    const value = e.target.value
    setSearchText(value);

    setSearchTimeout(
      setTimeout(() => {
        dispatch(search({
          text: value,
          data: posts.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()) || item.prompt.toLowerCase().includes(value.toLowerCase()))
        }))
      }, 500)
    )  
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const result = await response.json()

          setPosts(result.data.reverse())
        }
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-primary text-[32px]'>The Community Showcase</h1>
        <p className='mt-2 text-secondary text-[16px] max-w-[500px]'>
          Browse through a collection of imaginative and visually stunning images generated be DALL-E AI
        </p>
      </div>

      <div className='mt-16'>
        <FormField 
          labelName='Search posts'
          type='text'
          name='text'
          placeholder='Search...'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-secondary text-xl mb-3'>
                Showing results for <span className='text-primary'>{searchText}</span>
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards 
                  data={searchedResults.data}
                  title='No search results found'
                />
              ) : (
                <RenderCards  
                  data={posts}
                  title='No posts found'
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home