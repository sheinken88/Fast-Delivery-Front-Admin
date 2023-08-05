import type { Package } from './packages'
import { packages } from './packages'

export interface User {
    id: number
    name: string
    active: boolean
    percentage: number
    image: string
    packages: Package[]
}

export const usersData: User[] = [
    {
        id: 1,
        name: 'Usuario 1',
        active: true,
        percentage: 70,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHsLLn9kI96lYuAtvgOvqUxJUIKq28iXDgQ&usqp=CAU',
        packages: packages.slice(0, 3),
    },
    {
        id: 2,
        name: 'Usuario 2',
        active: false,
        percentage: 30,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHsLLn9kI96lYuAtvgOvqUxJUIKq28iXDgQ&usqp=CAU',
        packages: packages.slice(3, 5),
    },
    {
        id: 3,
        name: 'Usuario 3',
        active: true,
        percentage: 50,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHsLLn9kI96lYuAtvgOvqUxJUIKq28iXDgQ&usqp=CAU',
        packages: packages.slice(5, 8),
    },
    {
        id: 4,
        name: 'Usuario 4',
        active: true,
        percentage: 100,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHsLLn9kI96lYuAtvgOvqUxJUIKq28iXDgQ&usqp=CAU',
        packages: packages.slice(8, 10),
    },
    {
        id: 5,
        name: 'Usuario 5',
        active: false,
        percentage: 0,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHsLLn9kI96lYuAtvgOvqUxJUIKq28iXDgQ&usqp=CAU',
        packages: packages.slice(10, 13),
    },
    {
        id: 6,
        name: 'Usuario 6',
        active: true,
        percentage: 70,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHsLLn9kI96lYuAtvgOvqUxJUIKq28iXDgQ&usqp=CAU',
        packages: packages.slice(13, 18),
    },
    {
        id: 7,
        name: 'Usuario 7',
        active: true,
        percentage: 35,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHsLLn9kI96lYuAtvgOvqUxJUIKq28iXDgQ&usqp=CAU',
        packages: packages.slice(18, 21),
    },
]
