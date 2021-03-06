USE [master]
GO
/****** Object:  Database [DMS]    Script Date: 2/13/2022 2:01:14 PM ******/
CREATE DATABASE [DMS]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DMS', FILENAME = N'D:\SoftwareProgramFiles-DoNotDelete\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\DMS.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DMS_log', FILENAME = N'D:\SoftwareProgramFiles-DoNotDelete\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\DMS_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [DMS] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DMS].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DMS] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DMS] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DMS] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DMS] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DMS] SET ARITHABORT OFF 
GO
ALTER DATABASE [DMS] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DMS] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DMS] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DMS] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DMS] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DMS] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DMS] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DMS] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DMS] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DMS] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DMS] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DMS] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DMS] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DMS] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DMS] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DMS] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DMS] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DMS] SET RECOVERY FULL 
GO
ALTER DATABASE [DMS] SET  MULTI_USER 
GO
ALTER DATABASE [DMS] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DMS] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DMS] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DMS] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DMS] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'DMS', N'ON'
GO
ALTER DATABASE [DMS] SET QUERY_STORE = OFF
GO
USE [DMS]
GO
/****** Object:  Table [dbo].[Transmittal]    Script Date: 2/13/2022 2:01:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transmittal](
	[transmittalid] [int] IDENTITY(1,1) NOT NULL,
	[wonNo] [varchar](50) NULL,
	[wonTitle] [varchar](500) NULL,
	[transmittalNo] [varchar](50) NULL,
	[date] [date] NULL,
	[from] [varchar](500) NULL,
	[to] [varchar](500) NULL,
 CONSTRAINT [PK_Transmittal] PRIMARY KEY CLUSTERED 
(
	[transmittalid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[transmittalDetail]    Script Date: 2/13/2022 2:01:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[transmittalDetail](
	[transmittalDetailid] [int] IDENTITY(1,1) NOT NULL,
	[docNumber] [varchar](50) NULL,
	[description] [varchar](500) NULL,
	[rev] [varchar](50) NULL,
	[status] [varchar](50) NULL,
	[type] [varchar](50) NULL,
	[transmittalid] [int] NULL,
 CONSTRAINT [PK_transmittalDetail] PRIMARY KEY CLUSTERED 
(
	[transmittalDetailid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Transmittal] ON 

INSERT [dbo].[Transmittal] ([transmittalid], [wonNo], [wonTitle], [transmittalNo], [date], [from], [to]) VALUES (31, N'AS0002', N'OFFSHORE MAINTENANCE CONTRACT - WORK PACK PREPARATION FOR AKER SOLUTIONS u', N'100', CAST(N'2021-03-01' AS Date), N'CALVIN TAN CHIEW SENG', N'BSP SEBASTIAN FOO, AER/77X')
SET IDENTITY_INSERT [dbo].[Transmittal] OFF
SET IDENTITY_INSERT [dbo].[transmittalDetail] ON 

INSERT [dbo].[transmittalDetail] ([transmittalDetailid], [docNumber], [description], [rev], [status], [type], [transmittalid]) VALUES (21, N'Doc1', N'OFFSHORE MAINTENANCE CONTRACT - WORK PACK PREPARATION FOR AKER SOLUTIONS', N'1', N'IFC', N'ORIGINALS', 31)
INSERT [dbo].[transmittalDetail] ([transmittalDetailid], [docNumber], [description], [rev], [status], [type], [transmittalid]) VALUES (22, N'Doc2', N'PART 01 NORMAL TIMESHEET JANUARY 2022', N'1', N'IFC', N'ORIGINALS', 31)
INSERT [dbo].[transmittalDetail] ([transmittalDetailid], [docNumber], [description], [rev], [status], [type], [transmittalid]) VALUES (23, N'Doc3', N'PART 02 OVERTIME TIMESHEET JANUARY 2022', N'1', N'IFC', N'ORIGINALS', 31)
INSERT [dbo].[transmittalDetail] ([transmittalDetailid], [docNumber], [description], [rev], [status], [type], [transmittalid]) VALUES (24, N'Doc5', N'JOURNEY REQUEST, DPR & APPROVAL OT REQUEST', N'1', N'IFC', N'ORIGINALS', 31)
SET IDENTITY_INSERT [dbo].[transmittalDetail] OFF
ALTER TABLE [dbo].[transmittalDetail]  WITH CHECK ADD  CONSTRAINT [FK_transmittalDetail_Transmittal] FOREIGN KEY([transmittalid])
REFERENCES [dbo].[Transmittal] ([transmittalid])
GO
ALTER TABLE [dbo].[transmittalDetail] CHECK CONSTRAINT [FK_transmittalDetail_Transmittal]
GO
/****** Object:  StoredProcedure [dbo].[DELETETRANSMITTAL]    Script Date: 2/13/2022 2:01:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DELETETRANSMITTAL]
@id int
AS

delete transmittalDetail where transmittalid=@id
delete Transmittal where transmittalid=@id
GO
/****** Object:  StoredProcedure [dbo].[DELETETRANSMITTAL_DETAIL]    Script Date: 2/13/2022 2:01:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DELETETRANSMITTAL_DETAIL]
@id int  
AS  
  
delete transmittalDetail where transmittalid=@id  
GO
USE [master]
GO
ALTER DATABASE [DMS] SET  READ_WRITE 
GO
