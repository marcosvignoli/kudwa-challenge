# 🏦 Kudwa Financial Dashboard Challenge

<div align="center">

![Kudwa Dashboard](https://img.shields.io/badge/Kudwa-Dashboard%20Challenge-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-green?style=for-the-badge&logo=vercel)](https://kudwa-challenge.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/marcosvignoli/kudwa-challenge)

</div>

<div align="center">

### 📱 **Dashboard Preview**
![Dashboard Screenshot](https://via.placeholder.com/800x400/1F2937/FFFFFF?text=Dashboard+Screenshot)

### 📊 **Report Page Preview**  
![Report Screenshot](https://via.placeholder.com/800x400/1F2937/FFFFFF?text=Report+Page+Screenshot)

</div>

---

A modern, responsive financial dashboard and reporting interface built with Next.js, TypeScript, and Tailwind CSS. This project demonstrates advanced frontend development skills, strategic thinking, and modern development practices.

## 🎯 Project Overview

### **Development Approach**

On this project my first step was to get a look and feel about the Kudwa website to get some inspiration to match the desired aesthetics.
After that, I've started working hand to hand with cursor to define rules of development and guidelines to follow so I can later generate a scrum plan to implement the features in a gradual and sustainable way.
I'm trying to empower myself with the help of the AI to make fast, sustainable and high quality code so establishing the bases of the context engineering was my first goal.
After that I've started implementing the layout and the pages to create the dashboard and the page report.
This is where I've faced the biggest challenge of this project, deciding which parts of the data should be rendered in a chart, which doesn't, what should be the functionality and looks. 
I also struggled a bit to find meaningful ways to implement Redux since the state management wasn't too complex, but ended up using it for UI state management (mobile menu, expanded sections, sidebar state) and tracking user preferences like the last visited period.

After a few iterations I landed on a good looking UI with cool animations.
You can see how the project and approach evolved through the commits. I was working on a money management system in my personal time to handle my own expenses so it was really fun to make this and a good practice.

## 🚀 Quick Start

### **Clone & Run**
```bash
# Clone the repository
git clone https://github.com/marcosvignoli/kudwa-challenge.git

# Navigate to project directory
cd kudwa-challenge

# Install dependencies
npm install

# Start development server
npm run dev
```

**Open [http://localhost:3000](http://localhost:3000) to view the application.**

## 🚀 Key Features

### **Dashboard Page**
- **Financial Overview**: Real-time metrics and KPIs
- **Interactive Charts**: Line charts and donut charts for data visualization
- **Responsive Design**: Optimized for all device sizes
- **Professional UI**: Clean, modern interface with Kudwa branding

### **Report Page**
- **Computed Insights**: 4 key financial metrics displayed prominently
- **Expandable Sections**: Interactive profit & loss statements
- **Data Visualization**: Comprehensive charts and graphs
- **Mobile Optimized**: Seamless experience across devices

### **Technical Excellence**
- **TypeScript**: Full type safety and excellent developer experience
- **Performance Optimized**: React.memo, useCallback, useMemo implementations
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Error Handling**: Graceful error boundaries and loading states

## 🏗️ Technical Architecture

### **Tech Stack**
- **Next.js 15**: Modern React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Professional data visualization
- **Framer Motion**: Smooth animations and transitions

### **Project Structure**
```
src/
├── app/                          # Next.js App Router
│   ├── dashboard/page.tsx        # Main dashboard
│   ├── report/page.tsx           # Financial report
│   └── layout.tsx                # Root layout
├── components/                   # Reusable UI components
│   ├── Layout/                   # Navigation & structure
│   ├── Dashboard/                # Dashboard components
│   ├── Charts/                   # Data visualization
│   ├── Report/                   # Report components
│   └── UI/                       # Shared components
├── lib/                          # Business logic
│   ├── data.ts                   # Data loading utilities
│   └── utils/                    # Data processing
└── types/                        # TypeScript definitions
```

### **Component Architecture**
- **Modular Design**: Reusable components with clear separation of concerns
- **Performance Optimized**: React.memo applied to all major components
- **Type Safe**: Full TypeScript integration
- **Responsive**: Mobile-first design approach


### **Key Design Decisions**
- **Mobile-First**: Responsive design optimized for all devices
- **Accessibility**: WCAG compliant color contrast and navigation
- **Professional Aesthetics**: Clean, modern financial interface
- **Smooth Animations**: Enhanced user experience with Framer Motion

## 🔧 Development Process

### **Strategic Planning**
1. **Research Phase**: Studied Kudwa website for brand alignment
2. **Context Engineering**: Established AI collaboration guidelines
3. **Architecture Planning**: Designed scalable component structure
4. **Iterative Development**: Evolved through multiple iterations

### **Biggest Challenge**
The most significant challenge was deciding which data should be rendered as charts versus other visualizations. This required careful analysis of:
- Data complexity and relationships
- User experience requirements
- Performance considerations
- Visual clarity and impact

Through multiple iterations, I developed a system that effectively balances information density with visual clarity.


## 📦 Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**
```bash

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run test suite
- `npm run lint` - Run ESLint

## 🚀 Performance Optimizations

### **React Optimizations**
- **React.memo**: Applied to all major components
- **useCallback**: Prevents unnecessary re-renders
- **useMemo**: Optimizes expensive calculations
- **Code Splitting**: Automatic with Next.js App Router

### **Bundle Optimization**
- **Tree Shaking**: Removes unused code
- **Image Optimization**: Next.js automatic optimization
- **CSS Optimization**: Tailwind CSS purging

### **Mobile Performance**
- **Responsive Images**: Optimized for different screen sizes
- **Touch Targets**: 44px minimum for mobile
- **Smooth Animations**: 60fps performance
- **Fast Loading**: Optimized for mobile networks

## 🎯 Accessibility Features

### **WCAG Compliance**
- **Color Contrast**: Meets AA standards
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels
- **Focus Management**: Logical tab order

### **User Experience**
- **Loading States**: Professional loading indicators
- **Error Boundaries**: Graceful error recovery
- **Responsive Design**: Works on all devices
- **Intuitive Navigation**: Clear information hierarchy

