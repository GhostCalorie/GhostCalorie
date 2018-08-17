'use strict'

const db = require('../server/db')
const {User, Day, Food, Meal, MealItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({name: 'joe', startingWeight: 324, weightGoal: 270, email: 'cody@email.com', password: '123'}),
    User.create({name: 'jim', startingWeight: 276, weightGoal: 250, email: 'murphy@email.com', password: '123'})
  ])

  const usr = await  User.create({name: 'bob', startingWeight: 276, weightGoal: 250, email: 'bobby@email.com', password: '123'})



  const madeDays = await Promise.all(
    [
      Day.create({
        id: 55,
        description: 'I ate snickers',
        createdAtString: '2018-08-08',
        date: '14',

      }),
      Day.create({
        id: 56,
        description: 'I ate mars bar',
        createdAtString: '2018-08-09',
        date: '15',
        calories : Math.ceil(Math.random()*2000),
        protein : Math.ceil(Math.random()*24),
        carbs : Math.ceil(Math.random()*15),
        fat : Math.ceil(Math.random()*18)

      }),
      Day.create({
        id: 57,
        description: 'I ate twix',
        createdAtString: '2018-08-10',
        date: '16',
        calories : Math.ceil(Math.random()*2000),
        protein : Math.ceil(Math.random()*24),
        carbs : Math.ceil(Math.random()*15),
        fat : Math.ceil(Math.random()*18)
      }),
      Day.create({
        id: 58,
        description: 'I ate snickers',
        createdAtString: '2018-08-11',
        date: '14',
        calories : Math.ceil(Math.random()*2000),
        protein : Math.ceil(Math.random()*24),
        carbs : Math.ceil(Math.random()*15),
        fat : Math.ceil(Math.random()*18)
      }),
      Day.create({
        id: 59,
        description: 'I ate mars bar',
        createdAtString: '2018-08-12',
        date: '15',
        calories : Math.ceil(Math.random()*2000),
        protein : Math.ceil(Math.random()*24),
        carbs : Math.ceil(Math.random()*15),
        fat : Math.ceil(Math.random()*18)
      }),
      Day.create({
        id: 60,
        description: 'I ate twix',
        createdAtString: '2018-08-13',
        date: '16',
        calories : Math.ceil(Math.random()*2000),
        protein : Math.ceil(Math.random()*24),
        carbs : Math.ceil(Math.random()*15),
        fat : Math.ceil(Math.random()*18)
      }),
      Day.create({
        id: 61,
        description: 'I ate mars bar',
        createdAtString: '2018-08-14',
        date: '15',
        calories : Math.ceil(Math.random()*2000),
        protein : Math.ceil(Math.random()*24),
        carbs : Math.ceil(Math.random()*15),
        fat : Math.ceil(Math.random()*18)
      }),
      Day.create({
        id: 62,
        description: 'I ate mars bar',
        createdAtString: '2018-08-15',
        date: '15',
        calories : Math.ceil(Math.random()*2000),
        protein : Math.ceil(Math.random()*24),
        carbs : Math.ceil(Math.random()*15),
        fat : Math.ceil(Math.random()*18)
      })

    ]
  )

  madeDays.map(elem => {
    usr.addDay(elem)
  })


  const foods = await Promise.all(
    [
      Food.create({
        brand_name: 'Whole Foods',
        item_name: 'pasta',
        nf_calories: 50,
        nf_sodium: 20,
        nf_protein: 10,
        nf_sugars: 15,
        nf_total_carbohydrate: 5,
        total_fat: 6
      }),
      Food.create({
        brand_name: '360',
        item_name: 'meat',
        nf_calories: 50,
        nf_sodium: 20,
        nf_protein: 10,
        nf_sugars: 15,
        nf_total_carbohydrate: 5,
        total_fat: 6
      }),
      Food.create({
        brand_name: 'kraft',
        item_name: 'cheese',
        nf_calories: 50,
        nf_sodium: 20,
        nf_protein: 10,
        nf_sugars: 15,
        nf_total_carbohydrate: 5,
        total_fat: 6
      }),
      Food.create({
        brand_name: 'rolo',
        item_name: 'chocolate',
        nf_calories: 50,
        nf_sodium: 20,
        nf_protein: 10,
        nf_sugars: 15,
        nf_total_carbohydrate: 5,
        total_fat: 6
      })
    ]
  )

  const mealItems = await Promise.all(
    [
      MealItem.create({

        quantity: 5,
        mealId: 1,
        foodId: 1
      }),
      MealItem.create({

        quantity: 10,
        mealId: 1,
        foodId: 2
      }),
      MealItem.create({

        quantity: 15,
        mealId: 2,
        foodId: 3
      }),
      MealItem.create({

        quantity: 25,
        mealId: 3,
        foodId: 4
      }),
    ]
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${foods.length} foods`)
  console.log(`seeded ${mealItems.length} mealItems`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')

    await db.close()


    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
