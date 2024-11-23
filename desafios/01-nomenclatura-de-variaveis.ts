// Nomenclatura de variáveis

const userCategories = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getData(req, res) {
  const githubUserName = String(req.query.username)

  if (!githubUserName) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const response = await fetch(`https://api.github.com/users/${githubUserName}`);

  if (response.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUserName}" not found`
    })
  }

  const userData = await response.json()

  const userCategoriesSortByFollowersDesc = userCategories.sort((a, b) =>  b.followers - a.followers); 

  const userCategory = userCategoriesSortByFollowersDesc.find(category => userData.followers > category.followers)

  const result = {
    github: githubUserName,
    category: userCategory.title
  }

  return result
}

getData({ query: {
  username: 'josepholiveira'
}}, {})