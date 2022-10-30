import React from "react";

import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
    },
    {
        title: 'RootOfEquations',
        path: '/components',
        icon: <FaIcons.FaJs/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Bisection',
                path: '/Bisection',
                icon: <RiIcons.RiCalculatorFill/>
            },
            {
                title: 'FalsePosition',
                path: '/FalsePosition',
                icon: <RiIcons.RiCalculatorLine/>
            },
            {
                title: 'OnePointIteration',
                path: '/OnePointIteration',
                icon: <RiIcons.RiCalculatorFill/>
            },
            {
                title: 'NewtonRaphson',
                path: '/NewtonRaphson',
                icon: <RiIcons.RiCalculatorLine/>
            },
            {
                title: 'Secant',
                path: '/Secant',
                icon: <RiIcons.RiCalculatorFill/>
            },            
        ]
    }
]