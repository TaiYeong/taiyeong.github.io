---
title: How to use
layout: home
permalink: "/"
---

## Step by Step

1. Not summary, Write useful contents!
2. With tool, Add post 
    - create file : year-month-date-title.md under _posts
    - Check in localhost 
    ```
    bundle exec jekyll serve
    ```
    - Publish : git commit -> git push

## What is the meaning of `understanding` and `my knowledge` after `reading and listening something`
- 자료를 만든 작가의 의도 파악
- 그 자료를 안보고 내 표현으로 표현할 수 있어야함
- 실제로 사용가능한 지식

## Tip : rule
- \## : main title
- \### : sub title
- more than four sharp : Could not appear on menu tree

## Purpose

- [USD](https://taiyeong.github.io/pipeline/2024-01-26-git.html) - case 단위의 api 적어놓기
- [Git](https://taiyeong.github.io/pipeline/2024-01-26-usd.html) - tablet 내용 추가 및 정리
- [Build Jekyll blog](https://taiyeong.github.io/pipeline/2024-01-26-jekyll.html) - clear
- [pyenv](https://taiyeong.github.io/pipeline/2024-01-26-pyenv.html) - clear
- [Rocky Linux setup]()
- [Docker Commands]()
- [Kitsu Setup]()
- [Openpype Setup]()
- [Gaffer Setup]()
- [MongoDB Setup]()


## Demo & Resources

[![Static Badge](https://img.shields.io/badge/Jekyll%20Gitbook%20Themes-yellowgreen)
](https://sighingnow.github.io/jekyll-gitbook)
[![Static Badge](https://img.shields.io/badge/Jekyll%20Gitbook%20github-blue)
](https://github.com/sighingnow/jekyll-gitbook)
[![Static Badge](https://img.shields.io/badge/badgeMaker-Shields%20io-important)
](https://shields.io/badges)


## Claude Code Automation

이 블로그에는 Claude Code CLI용 자동화 워크플로우가 내장되어 있습니다.

### Slash Commands (자주 쓰는 명령어)

| 명령어 | 인수 (선택) | 설명 |
|---|---|---|
| `/integrate-posts` | `2026-02-28-blender.md` 등 파일명 | `temp_posts/`의 AI 대화 메모를 정제해서 `_posts/`의 해당 포스트에 통합 후 스테이징 파일 초기화 |
| `/ui-design` | `sidebar`, `typography`, `mobile` 등 | 현재 사이트 프런트엔드를 분석해 UI/UX 개선 스펙을 `temp_design/design-spec.md`에 저장 |
| `/implement-frontend` | `Improvement 2` 등 특정 항목 | `temp_design/design-spec.md`의 스펙을 읽어 `_includes/`, `_layouts/`, `assets/`에 실제 구현 |
| `/improve-frontend` | `sidebar`, `mobile` 등 | `/ui-design` → `/implement-frontend` 두 단계를 연속으로 실행 |

### Agents (자동 실행되는 전문 에이전트)

| 에이전트 | 트리거 예시 | 역할 |
|---|---|---|
| `post-integrator` | `temp_posts에 새 내용 생겼어, 포스트에 통합해줘` | AI 대화 로그를 정제해 `_posts/`의 올바른 위치에 문맥 기반으로 통합 |
| `blog-post-reviewer` | `_posts/2026-04-12-usd.md 검토하고 개선해줘` | 특정 포스트의 기술 정확도 검토, 내용 보완, 헤딩 구조(`##`/`###`) 최적화 |
| `celpip-coach-7to8` | `temp_for_english/2025-10-21-CELPIP.md 읽고 학습 자료로 만들어줘` | CELPIP Band 7-8 목표 코칭 — 템플릿 기반 Speaking/Writing 전략, `_posts/2025-10-21-CELPIP.md`에 통합 |
| `english-expression-organizer` | `temp_for_english/2025-10-22-english.md 정리해줘` | 영어 표현 메모를 5컬럼 복습 테이블(표현/심상이미지/뉘앙스/예시문/상황해석)로 변환, `_posts/2025-10-22-english.md`에 저장 |

### Staging 폴더 구조

```
temp_posts/          # AI 대화 메모 → /integrate-posts 로 _posts/에 통합
temp_for_english/
  2025-10-21-CELPIP.md   # CELPIP 연습 내용 → celpip-coach-7to8 에이전트 처리
  2025-10-22-english.md  # 영어 표현 메모  → english-expression-organizer 에이전트 처리
temp_design/
  design-spec.md     # /ui-design 결과물 → /implement-frontend 가 읽어서 구현
```

### 공부법
- 파레토의 법칙 : 공부할지식이 100% 라고할때, 20%의 지식이 나머지 80%를 좌우한다라는 법칙
- 디버깅 일기 : 버그들을 일기형태로 저장
    - 제목 : 에러 메세지
    - 원인 / 해결방향 / 관련 지식 및 용어
- First word : 모르는 영역을 공부할때는, terminology를 제대로 이해하고 넘어가라 ! 

### Space 규칙

#### One Drive folder
비자 등 관련된 중요한 문서들

#### Google Drive

##### Gemini-Drive
Gemini를 통해 알게된 보고서 및 답변들

##### Gemini-Gems
Gems에 feed할 자료들 위주

### Scheduling 규칙
#### Google Calender - 일정
Uncommon schedule - 결혼 기념일, 생일 등 가족 또는 다른 사람과의 일정

#### Google Calender - 할 일 / Tasks
Regular schedule (Routine) - 식물의 물주기 등 매일은 아니지만 1주일 또는 한달 단위의 루틴 일정

#### Planning Note
그 날 새롭게 갱신되는 업무 또는 일들