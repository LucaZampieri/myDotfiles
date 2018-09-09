#!/bin/sh
# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH


# Path to your oh-my-zsh installation.
  export ZSH="/home/zampieri/.oh-my-zsh"

# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
 ZSH_THEME="agnoster"

# CASE_SENSITIVE="false" 
# COMPLETION_WAITING_DOTS="true" 
#HIST_STAMPS="dd.mm.yyyy" # "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"


# Which plugins would you like to load?
# Standard plugins can be found in ~/.oh-my-zsh/plugins/*
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
  git
  sudo
  
)

source $ZSH/oh-my-zsh.sh

##### User configuration #####

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

alias zshconf="gedit ~/.zshrc"

# ssh
#export SSH_KEY_PATH="~/.ssh/rsa_id"

source ~/.aliases

